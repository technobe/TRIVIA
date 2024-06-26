// import "../styles/List.scss";
// import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const WishList = () => {
//   const wishList = useSelector((state) => state.user.wishList);

//   return (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Wish List</h1>
//       <div className="list">
//         {wishList?.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//             state,
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
//               state={state}
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

// export default WishList;

/////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import "../styles/List.scss";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection } from "@firebase/firestore";
// import { app } from "../firebase";
// const db = getFirestore(app);
// const auth = getAuth(app);


// const WishList = () => {
//   const [wishList, setWishList] = useState([]);

//   useEffect(() => {
//     // Fetch wish list data from Firebase Firestore
//     const fetchWishList = async () => {
//       const user = auth.currentUser; // Assuming user is logged in
//       if (user) {
//         const userId = user.uid;
//         const wishListRef = collection("wishlists").doc(userId);
//         const snapshot = await wishListRef.get();
//         if (snapshot.exists) {
//           setWishList(snapshot.data().listings);
//         }
//       }
//     };

//     fetchWishList();

//     // Listen for real-time updates (if needed)
//     // const unsubscribe = wishListRef.onSnapshot((snapshot) => {
//     //   setWishList(snapshot.data().listings);
//     // });

//     // return () => unsubscribe(); // Unsubscribe from real-time updates when component unmounts
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Wish List</h1>
//       <div className="list">
//         {wishList.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//             state,
//             country,
//             category,
//             type,
//             price,
//             booking = false,
//           }) => (
//             <ListingCard
//               key={_id} // Add a unique key for each listing
//               listingId={_id}
//               creator={creator}
//               listingPhotoPaths={listingPhotoPaths}
//               city={city}
//               state={state}
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

// export default WishList;

/////////////////////////////////////


import React, { useState, useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { getFirestore, collection, doc, getDoc } from "@firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const WishList = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    // Fetch wish list data from Firebase Firestore
    const fetchWishList = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?.uid;
        console.log("User ID:", userId);
        
        if (userId) {
          console.log("Fetching wish list for user:", userId);
          
          const wishListRef = doc(collection(db, "wishlist"), userId);
          const docSnapshot = await getDoc(wishListRef);
          
          if (docSnapshot.exists()) {
            const wishlistData = docSnapshot.data();
            console.log("User's wishlist:", wishlistData);

            // Retrieve the listing IDs stored in the user's wishlist
            const listingIds = wishlistData.listings || [];
            console.log("Listing IDs in wishlist:", listingIds);

            // Fetch details of each listing using its ID
            const listingsPromises = listingIds.map(async (listingId) => {
              const listingRef = doc(collection(db, "listings"), listingId);
              const listingSnapshot = await getDoc(listingRef);
              if (listingSnapshot.exists()) {
                return listingSnapshot.data();
              } else {
                console.log(`Listing with ID ${listingId} does not exist.`);
                return null;
              }
            });

            // Wait for all listing details to be fetched
            const listings = await Promise.all(listingsPromises);
            console.log("Fetched Listings:", listings);

            // Filter out null values (if any) and set the wishlist state
            setWishList(listings.filter((listing) => listing !== null));
          } else {
            console.log("User's wishlist does not exist or is empty.");
          }
        } else {
          console.log("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishList();

    // Clean-up function for useEffect can be added here if needed
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList.map(({
            _id,
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
              key={_id}
              listingId={_id}
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
      <Footer />
    </>
  );
};

export default WishList;




