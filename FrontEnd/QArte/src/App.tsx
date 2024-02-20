import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResponsiveAppBar } from "./Components/Navbar/Navbar.js";
import Home from "./Pages/Home/Home.js";
import SignIn from "./Pages/SignIn/SignIn.js";
import SignUp from "./Pages/SignUp/SignUp.js";
import About from "./Pages/About/About.js";
import Blog from "./Pages/Blog/Blog.js";
import Explore from "./Pages/Explore/Explore.js";
import UserPage from './Components/UserPageComponents/UserPage/UserPage.js';
import UserList from './Components/ExplorePage/ExplorePage.js';
import SuccessPage from './Components/Stripe/SuccessPage.jsx';
import ErrorPage from './Components/Stripe/ErrorPage.jsx';
import  StripeCheckout from './Components/Stripe/StripeCheckout.jsx'
import ExplorePage from "./Components/ExplorePage/ExplorePage.js";
import SubPageContainer from "./Components/UserPageComponents/SubPageContainer/SubPageContainer.js";
import UserGallery from "./Components/UserGallery/UserGallery.js";
import Register from "./Pages/Register/Register.js";
import PageAdd from "./Components/PageAdd/PageAdd.js";





function App() {

  return (
    <BrowserRouter>
      <div>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/stripe-checkout" element={<StripeCheckout />} /> 
          <Route path="/stripe-success" element={<SuccessPage />} /> 
          <Route path="/stripe-error" element={<ErrorPage />} /> 
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/explore">
            <Route index element={<ExplorePage/>}/>
            <Route path=":Uid/*" element={<UserPage/>}>
              <Route path=":id" element={<SubPageContainer/>}/>
            </Route>
          </Route>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;




