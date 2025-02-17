export const formatCurrency = (value: number) => {
  return value.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })
}

export const getImagePath = (image: string) => {
  return image.includes('cloudinary') ? image : `/products/${image}.jpg`;
}