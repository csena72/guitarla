import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";


function App() {

  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    setData(db)
  }, [])

  const addToCart = (item) => {
    
    const itemExists = cart.some((guitar) => guitar.id === item.id)
    if(itemExists){
      setCart(cart.map((guitar) => guitar.id === item.id ? {...item, quantity: guitar.quantity + 1} : guitar))
      } else {
        setCart([...cart, {...item, quantity: 1}])
      }
  }

  return (
    <>
      <Header />


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
