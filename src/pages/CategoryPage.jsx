// import { useState, useEffect } from "react";
// import "../styles/List.scss";
// import Navbar from "../components/Navbar";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setListings } from "../redux/state";
// import Loader from "../components/Loader";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const CategoryPage = () => {
//   const [loading, setLoading] = useState(true);
//   const { category } = useParams()

//   const dispatch = useDispatch()
//   const listings = useSelector((state) => state.listings);

//   const getFeedListings = async () => {
//     try {
//       const response = await fetch(
//           `http://localhost:3001/properties?category=${category}`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setListings({ listings: data }));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Listings Failed", err.message);
//     }
//   };

//   useEffect(() => {
//     getFeedListings();
//   }, [category]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">{category} listings</h1>
//       <div className="list">
//         {listings?.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//            state,
//             country,
//             category,
//             type,
//             price,
//             booking = false,
//           }) => (
//             <ListingCard
//               listingId={_id}
//               creator={creator}
//               listingPhotoPaths={listingPhotoPaths}
//               city={city}
//              state={province}
//               country={country}
//               category={category}
//               type={type}
//               price={price}
//               booking={booking}
//             />
//           )
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CategoryPage;

///////////////////////////////////////

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../styles/List.scss";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const [listings, setListings] = useState([]);

  const getFeedListings = async () => {
    try {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const data = [];
  
      querySnapshot.forEach((doc) => {
        const listingData = { id: doc.id, ...doc.data() };
        data.push(listingData);
      });
  
      console.log("Fetched data:", data);
      setListings(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };
  
  

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            listingId={listing.id}
            photos={listing.photos} // Pass photos directly
            city={listing.city || "N/A"}
            state={listing.state || "N/A"}
            country={listing.country || "N/A"}
            category={listing.category || "N/A"}
            type={listing.type || "N/A"}
            price={listing.price || "N/A"}
            booking={listing.booking || false}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
