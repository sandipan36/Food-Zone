import { Homepage, Blogcontent } from "./Pages";
import {Routes,Route} from "react-router-dom"
import { About, Cart, Images, Product } from "./component";
import Videos from "./component/Videos";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer"
import Usefetch from "./component/hooks/Usefetch";
import Products from "./component/Products";
import Loading from "./Pages/Loading";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CompanyLogos from "./component/CompanyLogo";

export default function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/blog/:id" element={<Blogcontent/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/Images" element={<Images/>}></Route>
        <Route path="/Videos" element={<Videos/>}></Route>
        <Route path="/Product" element={<Product/>}></Route>
        <Route path="/Products/:id" element={<Products/>}></Route>
        <Route path ="/Signup" element ={<Signup/>}></Route>
        <Route path="/Login" element = {<Login/>}></Route>
        <Route path="/Cart" element = {<Cart/>}></Route>
      </Routes>
      <div className='min-h-max'>
        <Footer/>
      </div>
    </div>
    
  )
}


