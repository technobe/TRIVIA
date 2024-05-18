// import { useEffect, useState } from "react";
// import { categories } from "../data";
// import "../styles/Listings.scss";
// import ListingCard from "./ListingCard";
// import Loader from "./Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { setListings } from "../redux/state";

// const Listings = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const listings = useSelector((state) => state.listings);

//   const getFeedListings = async () => {
//     try {
//       const response = await fetch(
//         selectedCategory !== "All"
//           ? `http://localhost:3001/properties?category=${selectedCategory}`
//           : "http://localhost:3001/properties",
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
//   }, [selectedCategory]);

//   return (
//     <>
//       <div className="category-list">
//         {categories?.map((category, index) => (
//           <div
//             className={`category ${category.label === selectedCategory ? "selected" : ""}`}
//             key={index}
//             onClick={() => setSelectedCategory(category.label)}
//           >
//             <div className="category_icon">{category.icon}</div>
//             <p>{category.label}</p>
//           </div>
//         ))}
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="listings">
//           {listings.map(
//             ({
//               _id,
//               creator,
//               listingPhotoPaths,
//               city,
//               province,
//               country,
//               category,
//               type,
//               price,
//               booking=false
//             }) => (
//               <ListingCard
//                 listingId={_id}
//                 creator={creator}
//                 listingPhotoPaths={listingPhotoPaths}
//                 city={city}
//                 province={province}
//                 country={country}
//                 category={category}
//                 type={type}
//                 price={price}
//                 booking={booking}
//               />
//             )
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Listings;
/////////////////////////////////////////
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import "../styles/Listings.scss";

const db = getFirestore(app);

const Listings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "listings"),
        selectedCategory !== "All" ? where("category", "==", selectedCategory) : null
      ),
      (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setListings(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, selectedCategory]);

  if (loading) return <Loader />;

  return (
    <>
      {/* Category selection UI */}

      <div className="listings">
        {listings.map(({ id, creator, listingPhotoPaths, city, state, country, category, type, price, booking = false }) => (
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
        ))}
      </div>
    </>
  );
};

export default Listings;
