// import "../styles/List.scss";
// import { useDispatch, useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import { useEffect, useState } from "react";
// import { setPropertyList } from "../redux/state";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer"

// const PropertyList = () => {
//   const [loading, setLoading] = useState(true)
//   const user = useSelector((state) => state.user)
//   const propertyList = user?.propertyList;
//   console.log(user)

//   const dispatch = useDispatch()
//   const getPropertyList = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
//         method: "GET"
//       })
//       const data = await response.json()
//       console.log(data)
//       dispatch(setPropertyList(data))
//       setLoading(false)
//     } catch (err) {
//       console.log("Fetch all properties failed", err.message)
//     }
//   }

//   useEffect(() => {
//     getPropertyList()
//   }, [])

//   return loading ? <Loader /> : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Property List</h1>
//       <div className="list">
//         {propertyList?.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//             province,
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
//               province={province}
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

// export default PropertyList;
//////////////////////////////////////////////

// import "../styles/List.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { setPropertyList } from "../redux/state";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer";
// import { getFirestore } from "firebase/firestore";
// import { app } from "../firebase";
// const db = getFirestore(app);

// const PropertyList = () => {
//   const [loading, setLoading] = useState(true);
//   const [propertyList, setPropertyList] = useState([]);
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getPropertyList = async () => {
//       try {
//         if (!user || !user.propertyList) {
//           return; // Ensure user and user.propertyList are not null or undefined
//         }

//         const listingsRef = collection(db, "listings");
//         const q = query(listingsRef, where("creator", "==", user._id));
//         const querySnapshot = await getDocs(q);
        
//         const tempList = [];
//         querySnapshot.forEach((doc) => {
//           tempList.push({ id: doc.id, ...doc.data() });
//         });

//         setPropertyList(tempList);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching property list:", err);
//         setLoading(false);
//       }
//     };

//     getPropertyList();
//   }, [user, db]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Property List</h1>
//       <div className="list">
//         {propertyList.map(
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
//               key={_id}
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

// export default PropertyList;

////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { setPropertyList } from "../redux/state";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer";
// import { getFirestore } from "firebase/firestore";
// import { app } from "../firebase";
// const db = getFirestore(app);

// const PropertyList = () => {
//   const [loading, setLoading] = useState(true);
//   const [propertyList, setPropertyList] = useState([]);
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;

//     if (!currentUser) {
//       // Redirect or handle the case where the user is not logged in
//       navigate("/login");
//       return;
//     }

//     const getPropertyList = async () => {
//       try {
//         const listingsRef = collection(db, "listings");
//         const q = query(listingsRef, where("creator", "==", currentUser.uid));
//         const querySnapshot = await getDocs(q);
        
//         const tempList = [];
//         querySnapshot.forEach((doc) => {
//           tempList.push({ id: doc.id, ...doc.data() });
//         });

//         setPropertyList(tempList);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching property list:", err);
//         setLoading(false);
//       }
//     };

//     getPropertyList();
//   }, [dispatch, navigate, db]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Property List</h1>
//       <div className="list">
//         {propertyList.map(
//           ({
//             _id,
//             creator, // Assuming you want to remove this part
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
//               key={_id}
//               listingId={_id}
//               // creator={creator} // Remove this line
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

// export default PropertyList;
////////////////////////////////////(last modified)
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { setPropertyList } from "../redux/state";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer";
// import { getFirestore } from "firebase/firestore";
// import { app } from "../firebase";

// const db = getFirestore(app);

// const PropertyList = () => {
//   const [loading, setLoading] = useState(true);
//   const [propertyList, setPropertyList] = useState([]);
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;

//     if (!currentUser) {
//       navigate("/login");
//       return;
//     }

//     const getPropertyList = async () => {
//       try {
//         const listingsRef = collection(db, "listings");
//         const q = query(listingsRef, where("creator", "==", currentUser.uid));
//         const querySnapshot = await getDocs(q);
        
//         const tempList = [];
//         querySnapshot.forEach((doc) => {
//           tempList.push({ id: doc.id, ...doc.data() });
//         });

//         setPropertyList(tempList);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching property list:", err);
//         setLoading(false);
//       }
//     };

//     getPropertyList();
//   }, [dispatch, navigate, db]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Property List</h1>
//       <div className="list">
//         {propertyList.map(
//           ({
//             id,
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
//               key={id}
//               listingId={id}
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

// export default PropertyList;


////////////////// Adding feature of manage property from below all

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { setPropertyList } from "../redux/state";
// import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer";
// import { getFirestore } from "firebase/firestore";
// import { app } from "../firebase";

// const db = getFirestore(app);

// const PropertyList = () => {
//   const [loading, setLoading] = useState(true);
//   const [propertyList, setPropertyList] = useState([]);
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;

//     if (!currentUser) {
//       navigate("/login");
//       return;
//     }

//     const getPropertyList = async () => {
//       try {
//         const listingsRef = collection(db, "listings");
//         const q = query(listingsRef, where("creator", "==", currentUser.uid));
//         const querySnapshot = await getDocs(q);
        
//         const tempList = [];
//         querySnapshot.forEach((doc) => {
//           tempList.push({ id: doc.id, ...doc.data() });
//         });

//         setPropertyList(tempList);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching property list:", err);
//         setLoading(false);
//       }
//     };

//     getPropertyList();
//   }, [dispatch, navigate, db]);

//   const removeProperty = async (propertyId) => {
//     try {
//       await deleteDoc(doc(db, "listings", propertyId));
//       setPropertyList(propertyList.filter(property => property.id !== propertyId));
//     } catch (error) {
//       console.error("Error removing property:", error);
//     }
//   };

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Property List</h1>
//       <div className="list">
//         {propertyList.map(
//           ({
//             id,
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
//             <div key={id} className="property-card">
//               <ListingCard
//                 listingId={id}
//                 listingPhotoPaths={listingPhotoPaths}
//                 city={city}
//                 state={state}
//                 country={country}
//                 category={category}
//                 type={type}
//                 price={price}
//                 booking={booking}
//               />
//               <div className="manage-buttons">
//                 <button onClick={() => navigate(`/edit-property/${id}`)}>Edit</button>
//                 <button onClick={() => removeProperty(id)}>Remove</button>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PropertyList;

/////////////////////////
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import "../styles/List.scss";

const db = getFirestore(app);

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const [propertyList, setPropertyList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))?.uid; // Get user ID from local storage

    const getPropertyList = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("userId", "==", userId)); // Filter by user ID
        const querySnapshot = await getDocs(q);
        
        const tempList = [];
        querySnapshot.forEach((doc) => {
          // Get the document data
          const data = doc.data();
          // Add the document ID to the data object
          data.id = doc.id;
          // Push the modified data to the temporary list
          tempList.push(data);
        });

        // Set the property list with the temporary list
        setPropertyList(tempList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching property list:", err);
        setLoading(false);
      }
    };

    getPropertyList();
  }, [navigate]);

  const removeProperty = async (propertyId) => {
    try {
      await deleteDoc(doc(db, "listings", propertyId));
      // Filter out the removed property from the property list
      setPropertyList(propertyList.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error("Error removing property:", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList.map(
          ({
            id,
            listingPhotoPaths,
            city,
            state,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <div key={id} className="property-card">
              <ListingCard
                listingId={id}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                state={state}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
              <div >
                <button className="manage-buttons1" onClick={() => navigate(`/create-listing`)}>Edit</button>
                <button className="manage-buttons2" onClick={() => removeProperty(id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;


