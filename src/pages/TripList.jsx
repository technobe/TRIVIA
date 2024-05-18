// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);

//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/trips`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setTripList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Trip List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List</h1>
//       <div className="list">
//         {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
//           <ListingCard
//             listingId={listingId._id}
//             creator={hostId._id}
//             listingPhotoPaths={listingId.listingPhotoPaths}
//             city={listingId.city}
//             province={listingId.province}
//             country={listingId.country}
//             category={listingId.category}
//             startDate={startDate}
//             endDate={endDate}
//             totalPrice={totalPrice}
//             booking={booking}
//           />
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TripList;
//////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";
// //import { firebaseConfig } from "../firebaseConfig";
// import firebase from "firebase/compat/app";
// import { getFirestore } from "firebase/firestore";

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebase);
//     }

//     const db = firebase.firestore();
//     const fetchTripList = async () => {
//       try {
//         const tripListRef = await db.collection("users").doc(userId).collection("trips").get();
//         const trips = tripListRef.docs.map((doc) => doc.data());
//         dispatch(setTripList(trips));
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching trip list: ", error);
//       }
//     };

//     fetchTripList();

//   }, [userId, dispatch]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List</h1>
//       <div className="list">
//         {tripList?.map((trip) => (
//           <ListingCard
//             key={trip.listingId}
//             listingId={trip.listingId}
//             creator={trip.hostId}
//             listingPhotoPaths={trip.listingPhotoPaths}
//             city={trip.city}
//             province={trip.province}
//             country={trip.country}
//             category={trip.category}
//             startDate={trip.startDate}
//             endDate={trip.endDate}
//             totalPrice={trip.totalPrice}
//             booking={trip.booking}
//           />
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TripList;

/////////////////////////////

import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id);
  const tripList = useSelector((state) => state.user.tripList);
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    console.log("userId:", userId);
    getTripList();
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList && tripList.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
          <ListingCard
            key={listingId._id}
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            state={listingId.state}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
      </div>
      <Footer />
    </>
  );
  
};

export default TripList;



