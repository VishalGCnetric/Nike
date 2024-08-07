import CartPage from "./Component/cart/CartPage";
import Footer from "./Component/footer/Footer";

// src/App.js
function App() {
  return (
    <div className="">
      <header className="bg-blue-500 text-white p-6">
        <h1 className="text-4xl font-bold">Hello Tailwind!</h1>
      </header>
      <CartPage/>
      <Footer/>
    </div>
  );
}

export default App;
