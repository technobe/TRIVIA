// import {Routes, Route} from "react-router-dom"
// import './App.css';
// import HomePage from "./pages/HomePage";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";

// function App() {
//   return (
//     <div>
      
//       <Routes>
//         <Route path="/" element={<HomePage />}/>
//         <Route path="/register" element={<RegisterPage />}/>
//         <Route path="/login" element={<LoginPage />}/>
//       </Routes>
      
      
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import Booking from "./pages/Booking";
import ContactUs from "./pages/ContactUs";
import Admin from "./pages/Admin";
import AdminLoginPage from "./pages/AdminLoginPage";

function App() {
  return (
    <div>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/userId/trips" element={<TripList />} />
          <Route path="/userId/wishList" element={<WishList />} />
          <Route path="/userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
        </Routes>

    </div>
  );
}

export default App;

