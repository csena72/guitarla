import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";


export const useCart = () => {

    const inicialCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    const [data, setData] = useState([])
    const [cart, setCart] = useState(inicialCart)
  
    const MIN_ITEMS = 1
    const MAX_ITEMS = 5
  
    useEffect(() => {
      setData(db)
    }, [])
  
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
  
    const addToCart = (item) => {
      const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
      if(itemExists >= 0) {
        if(cart[itemExists].quantity >= MAX_ITEMS) return
        setCart(cart.map((guitar) => guitar.id === item.id ? {...item, quantity: guitar.quantity + 1} : guitar))
        } else {
          setCart([...cart, {...item, quantity: 1}])
        }
    }
  
    const removeFromCart = (id) => {
      const newCart = cart.filter((guitar) => guitar.id !== id)
      setCart(newCart)
    }
  
    const incrementQuantity = (id) => {
      const newCart = cart.map((guitar) => guitar.id === id && guitar.quantity  < MAX_ITEMS ? {...guitar, quantity: guitar.quantity + 1} : guitar)
      setCart(newCart)
    }
  
    const decrementQuantity = (id) => {
      const newCart = cart.map((guitar) => guitar.id === id && guitar.quantity  > MIN_ITEMS ? {...guitar, quantity: guitar.quantity - 1} : guitar)
      setCart(newCart)
    }
  
    const cleanCart = () => {
      setCart([])
    }

    // state derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce((total, guitar) => total + guitar.quantity * guitar.price, 0), [cart] )

    return {
        cart,
        data,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cleanCart,
        isEmpty,
        cartTotal,
    }
}