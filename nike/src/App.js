import CartPage from "./Component/cart/CartPage";
import Footer from "./Component/footer/Footer";
import TrendingProjectsCarousel from "./Component/footer/Profile";

// src/App.js
function App() {
  return (
    <div className="">
      <header className="bg-blue-500 text-white p-6">
        <h1 className="text-4xl font-bold">Hello Tailwind!</h1>
      </header>
      <CartPage/>
   <TrendingProjectsCarousel/>
      <Footer/>
    </div>
  );
}

export default App;
