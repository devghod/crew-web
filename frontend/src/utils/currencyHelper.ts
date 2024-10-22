const currencyCode = 'PHP'

export const currencyFormat = currency => {
  const currFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  })
  return currFormat.format(currency)
}
