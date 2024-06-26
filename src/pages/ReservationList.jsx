// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const reservationList = useSelector((state) => state.user.reservationList);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getReservationList();
//   });

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
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

// export default ReservationList;

///////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const { userId } = useParams(); // Extract userId from URL
//   const reservationList = useSelector((state) => state.user?.reservationList);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       getReservationList();
//     }
//   }, [userId]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking }) => (
//           <ListingCard
//             key={listingId?._id}
//             listingId={listingId?._id}
//             creator={hostId?._id}
//             listingPhotoPaths={listingId?.listingPhotoPaths}
//             city={listingId?.city}
//             province={listingId?.province}
//             country={listingId?.country}
//             category={listingId?.category}
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

// export default ReservationList;


import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { getFirestore, collection, query, where, getDocs, getDoc,doc } from "firebase/firestore";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const [reservationList, setReservationList] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).uid;

  console.log(userId);

  const fetchReservationList = async () => {
    try {
      const db = getFirestore();
      const q = query(collection(db, "tripList"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const tripList = [];
      querySnapshot.forEach(doc => {
        tripList.push({ id: doc.id, ...doc.data() });
      });

      console.log("Trip List:", tripList);

      const listingIds = tripList.map(trip => trip.listingId);
      console.log("Listing IDs:", listingIds);

      const listingDetails = [];

      for (const listingId of listingIds) {
        const listingDoc = await getDoc(doc(db, "listings", listingId));
        const listingData = listingDoc.data();
        console.log("Listing Data:", listingData);
        listingDetails.push({ id: listingDoc.id, ...listingData });
      }

      console.log("Listing Details:", listingDetails);

      setReservationList(listingDetails);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reservation list: ", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReservationList();
    }
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList.map(listing => (
          <ListingCard
            key={listing.id}
            listingId={listing.id}
            city={listing.city}
            province={listing.province}
            country={listing.country}
            category={listing.category}
            // Add other relevant props as needed
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
