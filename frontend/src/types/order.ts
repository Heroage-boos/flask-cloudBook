export interface Order {
  id: number
  userId: number
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'paid' | 'cancelled' | 'refunded'
  createdAt: string
  paidAt?: string
}

export interface OrderItem {
  bookId: number
  bookTitle: string
  price: number
  quantity: number
}