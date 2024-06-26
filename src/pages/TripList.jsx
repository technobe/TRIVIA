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



import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase.js"; // Import Firebase firestore instance
import { getDocs, collection, where, query, doc, getDoc } from "firebase/firestore"; // Correct imports for Firestore methods

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const [tripList, setTripList] = useState([]);
  const [userId, setUserId] = useState(null);

  const getTripList = async () => {
    try {
      // Get user data from local storage
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (!userDataFromLocalStorage || !userDataFromLocalStorage.uid) {
        console.log("User data or UID not found in local storage.");
        setLoading(false);
        return;
      }

      // Set userId in state
      setUserId(userDataFromLocalStorage.uid);

      // Fetch tripList data from Firebase Firestore
      const tripListRef = collection(db, "tripList");
      const querySnapshot = await getDocs(query(tripListRef, where("userId", "==", userDataFromLocalStorage.uid)));

      const tripDataPromises = querySnapshot.docs.map(async tripDoc => {
        const tripData = tripDoc.data();
        // Get the listingId property of the doc
        const listingId = tripData.listingId;
        console.log(listingId);
        // Fetch listing details from "listings" collection
        const listingDocRef = doc(db, "listings", listingId);
        const listingDocSnapshot = await getDoc(listingDocRef);
        if (listingDocSnapshot.exists()) {
          const listingData = listingDocSnapshot.data();
          // Merge listing details with trip data
          return {
            id: tripDoc.id,
            listingId,
            listingDetails: listingData, // Store listing details along with trip data
            ...tripData,
          };
        } else {
          console.log(`Listing with ID ${listingId} does not exist.`);
          return null; // Or handle this case according to your requirement
        }
      });

      // Resolve all promises
      const tripData = await Promise.all(tripDataPromises);

      // Filter out null values (if any)
      const filteredTripData = tripData.filter(trip => trip !== null);

      // Log userId here since it's accessible
      console.log("UserID:", userDataFromLocalStorage.uid);

      setTripList(filteredTripData);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Your Trip List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {tripList.map(({ id, listingId, listingDetails, startDate, endDate, totalPrice, booking = true }) => (
          <div key={id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "20px", width: "300px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>{listingDetails.aptSuite}</h2>
            <p style={{ margin: "5px 0" }}>Street Address: {listingDetails.streetAddress}</p>
            <p style={{ margin: "5px 0" }}>City: {listingDetails.city}</p>
            <p style={{ margin: "5px 0" }}>State: {listingDetails.state}</p>
            <p style={{ margin: "5px 0" }}>Country: {listingDetails.country}</p>
            <p style={{ margin: "5px 0" }}>Category: {listingDetails.category}</p>
            <p style={{ margin: "5px 0" }}>Type: {listingDetails.type}</p>
            <p style={{ margin: "5px 0" }}>Guest Count: {listingDetails.guestCount}</p>
            <p style={{ margin: "5px 0" }}>Bathroom Count: {listingDetails.bathroomCount}</p>
            <p style={{ margin: "5px 0" }}>Bedroom Count: {listingDetails.bedroomCount}</p>
            <p style={{ margin: "5px 0" }}>Bed Count: {listingDetails.bedCount}</p>
            <p style={{ margin: "5px 0" }}>Price: {listingDetails.price}</p>
            <p style={{ margin: "5px 0" }}>Amenities:</p>
            <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
              {listingDetails.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
            <p style={{ margin: "5px 0" }}>Photos:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {listingDetails.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Photo ${index}`} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }} />
              ))}
            </div>
            <p style={{ margin: "5px 0" }}>Start Date: {startDate}</p>
            <p style={{ margin: "5px 0" }}>End Date: {endDate}</p>
            <p style={{ margin: "5px 0" }}>Total Price: {totalPrice}</p>
            <p style={{ margin: "5px 0" }}>Booking: {booking ? "Confirmed" : "Pending"}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TripList;




