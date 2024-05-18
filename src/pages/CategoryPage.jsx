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
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const [listings, setListings] = useState([]);

  const getFeedListings = async () => {
    try {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
        {listings.map(
          ({
            id,
            creator,
            listingPhotoPaths,
            city,
            state,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={id}
              listingId={id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              state={state}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;