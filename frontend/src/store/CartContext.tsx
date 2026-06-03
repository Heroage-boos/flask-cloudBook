"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { Book } from "@/types/book"

interface CartItem extends Book {
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Book }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

interface CartContextType {
  state: CartState
  addItem: (book: Book) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalCount: state.totalCount + 1,
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalCount: state.totalCount + 1,
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        totalCount: state.totalCount - (state.items.find(item => item.id === action.payload)?.quantity || 0),
      }
    case "UPDATE_QUANTITY": {
      const item = state.items.find(item => item.id === action.payload.id)
      if (!item) return state
      const quantityDiff = action.payload.quantity - item.quantity
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalCount: state.totalCount + quantityDiff,
      }
    }
    case "CLEAR_CART":
      return { items: [], totalCount: 0 }
    case "LOAD_CART":
      return {
        items: action.payload,
        totalCount: action.payload.reduce((acc, item) => acc + item.quantity, 0),
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalCount: 0 })

  useEffect(() => {
    const savedCart = localStorage.getItem("cloudbook-cart")
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: items })
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cloudbook-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (book: Book) => dispatch({ type: "ADD_ITEM", payload: book })
  const removeItem = (id: number) => dispatch({ type: "REMOVE_ITEM", payload: id })
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  const clearCart = () => dispatch({ type: "CLEAR_CART" })

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}