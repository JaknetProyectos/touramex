"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type TourLike = {
  id: string;
  slug?: string;
  title: string;
  title_english?: string | null;
  description?: string;
  description_english?: string | null;
  price: number;
  image_url?: string | null;
  image?: string | null;
  destination: string;
  duration?: string | null;
};

export interface CartTour {
  id: string;
  slug: string;
  title: string;
  title_english: string | null;
  description: string | null;
  description_english: string | null;
  price: number;
  image_url: string | null;
  destination: string;
  duration: string | null;
}

export interface CartItem {
  tour: CartTour;
  adults: number;
  date?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (tour: TourLike, adults: number, date?: string) => void;
  removeFromCart: (tourId: string) => void;
  updateQuantity: (tourId: string, adults: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "gobeyond-cart-v2";
const LEGACY_STORAGE_KEY = "gobeyond-cart";
const CHANNEL_NAME = "gobeyond-cart-sync";

function normalizeTour(tour: TourLike): CartTour {
  return {
    id: tour.id,
    slug: tour.slug ?? tour.id,
    title: tour.title,
    title_english: tour.title_english ?? null,
    description: tour.description ?? null,
    description_english: tour.description_english ?? null,
    price: tour.price,
    image_url: tour.image_url ?? tour.image ?? null,
    destination: tour.destination,
    duration: tour.duration ?? null,
  };
}

function safeParseCart(raw: string | null): CartItem[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        const tour = item?.tour;
        if (!tour?.id) return null;

        return {
          tour: {
            id: tour.id,
            slug: tour.slug ?? tour.id,
            title: tour.title ?? "",
            title_english: tour.title_english ?? null,
            description: tour.description ?? null,
            description_english: tour.description_english ?? null,
            price: Number(tour.price ?? 0),
            image_url: tour.image_url ?? tour.image ?? null,
            destination: tour.destination ?? "",
            duration: tour.duration ?? null,
          },
          adults: Number(item.adults ?? 0),
          date: item.date,
        } as CartItem;
      })
      .filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

function loadInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const current = safeParseCart(localStorage.getItem(STORAGE_KEY));
  if (current.length > 0) return current;

  const legacy = safeParseCart(localStorage.getItem(LEGACY_STORAGE_KEY));
  if (legacy.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
    return legacy;
  }

  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    localStorage.removeItem(LEGACY_STORAGE_KEY);

    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage(items);
      channel.close();
    }
  }, [items]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setItems(safeParseCart(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);

    let channel: BroadcastChannel | null = null;
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (Array.isArray(event.data)) {
          setItems(event.data as CartItem[]);
        }
      };
    }

    return () => {
      window.removeEventListener("storage", handleStorage);
      if (channel) channel.close();
    };
  }, []);

  const addToCart = (tour: TourLike, adults: number, date?: string) => {
    if (adults <= 0) return;

    const normalizedTour = normalizeTour(tour);

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.tour.id === normalizedTour.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.tour.id === normalizedTour.id
            ? {
                ...item,
                adults: item.adults + adults,
                date: date ?? item.date,
                tour: normalizedTour,
              }
            : item
        );
      }

      return [...prevItems, { tour: normalizedTour, adults, date }];
    });
  };

  const removeFromCart = (tourId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.tour.id !== tourId));
  };

  const updateQuantity = (tourId: string, adults: number) => {
    if (adults <= 0) {
      removeFromCart(tourId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.tour.id === tourId ? { ...item, adults } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.tour.price * item.adults, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.adults, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}