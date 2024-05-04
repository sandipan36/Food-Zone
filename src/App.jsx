import { Homepage, Blogcontent } from "./Pages";
import {Routes,Route} from "react-router-dom"
import { About, Images, Product } from "./component";
import Videos from "./component/Videos";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer"
import Usefetch from "./component/hooks/Usefetch";
import Products from "./component/Products";
import Loading from "./Pages/Loading";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";


export default function App() {
// let {loading, data, error}=Usefetch("http://localhost:1337/api/products")
// if(loading) return <Loading/>
// if(error) return <p>Network Error</p>

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
      </Routes>
      <div className='min-h-max'>
        <Footer/>
      </div>
    </div>
    
  )
}



// // subs={data?data:""}


// import React, { Children } from 'react'
// import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
// import { About, Footer } from "./component";
// import { Blogcontent, Homepage } from "./Pages";



// const router = createBrowserRouter([
//   {
//     path:"/",
//     element : <Layout/>,
//     Children:[
//       {
//         path:"/",
//         element:<Homepage/>
//       },
//       {
//         path:"/blog/:id",
//         element:<Blogcontent/>
//       },
//       {
//         path:"/about",
//         element:<About/>
//       }
//     ]
//   },
// ])


// export default function App() {
//   return (
//     <div>
//       <RouterProvider router= {router}/>
//     </div>
//   )
// }
