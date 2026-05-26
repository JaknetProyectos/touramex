export const formatPrice = (
    amount: number,
    currency: string = "MXN",
    includeCurrency: boolean = true
): string => {
    const formatted = new Intl.NumberFormat("es-MX", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)

    return includeCurrency
        ? `${currency} $${formatted}`
        : `$${formatted}`
}