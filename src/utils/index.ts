export const formatCurrency = (value: number) => {
  return value.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })
}