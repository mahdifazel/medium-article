export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
  unit: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  id: string
  name: string
  icon: string
}