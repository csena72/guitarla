import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";


function App() {

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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        cleanCart={cleanCart}
      />


      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => (
              <Guitar 
                key={guitar.id} 
                guitar={guitar} 
                setCart={setCart}
                addToCart={addToCart}
              />
            ))
          }
        </div>
        
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App
