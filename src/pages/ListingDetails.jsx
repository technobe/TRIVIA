// import { useEffect, useState } from "react";
// import "../styles/ListingDetails.scss";
// import { useNavigate, useParams } from "react-router-dom";
// import { facilities } from "../data";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import Footer from "../components/Footer"

// const ListingDetails = () => {
//   const [loading, setLoading] = useState(true);

//   const { listingId } = useParams();
//   const [listing, setListing] = useState(null);

//   const getListingDetails = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/properties/${listingId}`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       setListing(data);
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Listing Details Failed", err.message);
//     }
//   };

//   useEffect(() => {
//     getListingDetails();
//   }, []);

//   console.log(listing)


//   /* BOOKING CALENDAR */
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   const handleSelect = (ranges) => {
//     // Update the selected date range when user makes a selection
//     setDateRange([ranges.selection]);
//   };

//   const start = new Date(dateRange[0].startDate);
//   const end = new Date(dateRange[0].endDate);
//   const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

//   /* SUBMIT BOOKING */
//   const customerId = useSelector((state) => state?.user?._id)

//   const navigate = useNavigate()

//   const handleSubmit = async () => {
//     try {
//       const bookingForm = {
//         customerId,
//         listingId,
//         hostId: listing.creator._id,
//         startDate: dateRange[0].startDate.toDateString(),
//         endDate: dateRange[0].endDate.toDateString(),
//         totalPrice: listing.price * dayCount,
//       }

//       const response = await fetch("http://localhost:3001/bookings/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingForm)
//       })

//       if (response.ok) {
//         navigate(`/${customerId}/trips`)
//       }
//     } catch (err) {
//       console.log("Submit Booking Failed.", err.message)
//     }
//   }

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
      
//       <div className="listing-details">
//         <div className="title">
//           <h1>{listing.title}</h1>
//           <div></div>
//         </div>

//         <div className="photos">
//           {listing.listingPhotoPaths?.map((item) => (
//             <img
//               src={`http://localhost:3001/${item.replace("public", "")}`}
//               alt="listing photo"
//             />
//           ))}
//         </div>

//         <h2>
//           {listing.type} in {listing.city}, {listing.province},{" "}
//           {listing.country}
//         </h2>
//         <p>
//           {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
//           {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
//         </p>
//         <hr />

//         <div className="profile">
//           <img
//             src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
//               "public",
//               ""
//             )}`}
//           />
//           <h3>
//             Hosted by {listing.creator.firstName} {listing.creator.lastName}
//           </h3>
//         </div>
//         <hr />

//         <h3>Description</h3>
//         <p>{listing.description}</p>
//         <hr />

//         <h3>{listing.highlight}</h3>
//         <p>{listing.highlightDesc}</p>
//         <hr />

//         <div className="booking">
//           <div>
//             <h2>What this place offers?</h2>
//             <div className="amenities">
//               {listing.amenities[0].split(",").map((item, index) => (
//                 <div className="facility" key={index}>
//                   <div className="facility_icon">
//                     {
//                       facilities.find((facility) => facility.name === item)
//                         ?.icon
//                     }
//                   </div>
//                   <p>{item}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2>How long do you want to stay?</h2>
//             <div className="date-range-calendar">
//               <DateRange ranges={dateRange} onChange={handleSelect} />
//               {dayCount > 1 ? (
//                 <h2>
//                   ${listing.price} x {dayCount} nights
//                 </h2>
//               ) : (
//                 <h2>
//                   ${listing.price} x {dayCount} night
//                 </h2>
//               )}

//               <h2>Total price: ${listing.price * dayCount}</h2>
//               <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
//               <p>End Date: {dateRange[0].endDate.toDateString()}</p>

//               <button className="button" type="submit" onClick={handleSubmit}>
//                 BOOKING
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default ListingDetails;

//////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import "../styles/ListingDetails.scss";
// import { useNavigate, useParams } from "react-router-dom";
// import { facilities } from "../data";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import Footer from "../components/Footer";
// import { db } from "../firebase"; // Correct import path for firebase
// import {collection, getDoc, doc} from "firebase/firestore";

// const ListingDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const { listingId } = useParams();
//   const [listing, setListing] = useState(null);
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);
//   const customerId = useSelector((state) => state?.user?._id);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getListingDetails = async () => {
//       try {
//         if (!listingId) {
//           console.log("Listing ID is empty!");
//           return;
//         }
  
//         const docRef = doc(db, "listings", listingId);
//         const docSnap = await getDoc(docRef);
  
//         if (docSnap.exists()) {
//           setListing(docSnap.data());
//           setLoading(false);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (err) {
//         console.log("Fetch Listing Details Failed", err.message);
//       }
//     };
  
//     getListingDetails();
//   }, [listingId]);
  

//   const handleSelect = (ranges) => {
//     setDateRange([ranges.selection]);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Your booking submission logic here
//       console.log("Booking submitted!");
//     } catch (err) {
//       console.log("Submit Booking Failed.", err.message);
//     }
//   };

//   const start = new Date(dateRange[0].startDate);
//   const end = new Date(dateRange[0].endDate);
//   const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <div className="listing-details">
//          <div className="title">
//           <h1>{listing.title}</h1>
//            <div></div>
//          </div>

//          <div className="photos">
//            {listing.listingPhotoPaths?.map((item) => (
//              <img
//                src={`http://localhost:3001/${item.replace("public", "")}`}
//                alt="listing photo"
//             />
//           ))}
//          </div>
//          <h2>
//            {listing.type} in {listing.city}, {listing.province},{" "}
//            {listing.country}
//          </h2>
//          <p>
//            {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
//            {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
//          </p>
//          <hr />

//          <div className="profile">
//            <img
//              src={`http://localhost:3001/${listing.creator.profileImagePath.replace(               "public",
//                ""
//              )}`}
//            />
//            <h3>
//              Hosted by {listing.creator.firstName} {listing.creator.lastName}
//            </h3>
//          </div>
//          <hr />

//          <h3>Description</h3>
//          <p>{listing.description}</p>
//          <hr />

//          <p>{listing.highlightDesc}</p>
//          <hr />

//          <div className="booking">


//            <div>
//              <h2>What this place offers?</h2>
//              <div className="amenities">
//                {listing.amenities[0].split(",").map((item, index) => (
//                  <div className="facility" key={index}>
//                    <div className="facility_icon">
//                      {
//                        facilities.find((facility) => facility.name === item)
//                          ?.icon
//                      }
//                    </div>
//                    <p>{item}</p>
//                  </div>
//                ))}
//              </div>
//            </div>

//            <div>
//              <h2>How long do you want to stay?</h2>
//              <div className="date-range-calendar">
//                <DateRange ranges={dateRange} onChange={handleSelect} />
//                {dayCount > 1 ? (
//                  <h2>
//                    ${listing.price} x {dayCount} nights
//                  </h2>
//                ) : (
//                  <h2>
//                    ${listing.price} x {dayCount} night
//                  </h2>
//               )}

//                <h2>Total price: ${listing.price * dayCount}</h2>
//                <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
//               <p>End Date: {dateRange[0].endDate.toDateString()}</p>

//               <button className="button" type="submit" onClick={handleSubmit}>
//                 BOOKING
//                </button>
//              </div>
//            </div>
//         </div>
//        </div>

//        <Footer />
//      </>
    
//   );
// };

// export default ListingDetails; 

////////////////*******************///////////////////

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { facilities } from "../data";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { db } from "../firebase"; // Correct import path for firebase
// import { getDoc, doc } from "firebase/firestore";

// import "../styles/ListingDetails.scss";



// const ListingDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const { listingId } = useParams();
//   const [listing, setListing] = useState(null);
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);
//  // const navigate = useNavigate();

//   useEffect(() => {
//     const getListingDetails = async () => {
//       try {
//         if (!listingId) {
//           console.log("Listing ID is empty!");
//           return;
//         }

//         const docRef = doc(db, "listings", listingId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setListing(docSnap.data());
//           setLoading(false);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (err) {
//         console.log("Fetch Listing Details Failed", err.message);
//       }
//     };

//     getListingDetails();
//   }, [listingId]);

//   const handleSelect = (ranges) => {
//     setDateRange([ranges.selection]);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Your booking submission logic here
//       console.log("Booking submitted!");
//     } catch (err) {
//       console.log("Submit Booking Failed.", err.message);
//     }
//   };

//   const start = new Date(dateRange[0].startDate);
//   const end = new Date(dateRange[0].endDate);
//   const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <div className="listing-details">
//          <div className="title">
//           <h1>{listing.title}</h1>
//            <div></div>
//          </div>

//          <div className="photos">
//            {listing.listingPhotoPaths?.map((item) => (
//              <img
//                src={`http://localhost:3001/${item.replace("public", "")}`}
//                alt="listing "
//             />
//           ))}
//          </div>
//          <h2>
//            {listing.type} in {listing.city}, {listing.province},{" "}
//            {listing.country}
//          </h2>
//          <p>
//            {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
//            {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
//          </p>
//          <hr />

//          {/* <div className="profile">
//            <img
//              src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public",
//                ""
//              )}`}
//            />
//            <h3>
//              Hosted by {listing.creator.firstName} {listing.creator.lastName}
//            </h3>
//          </div> */}
//          <hr />

//          <h3>Description</h3>
//          <p>{listing.description}</p>
//          <hr />

//          <p>{listing.highlightDesc}</p>
//          <hr />

//          <div className="booking">


//            <div>
//              <h2>What this place offers?</h2>
//              <div className="amenities">
//                {listing.amenities[0].split(",").map((item, index) => (
//                  <div className="facility" key={index}>
//                    <div className="facility_icon">
//                      {
//                        facilities.find((facility) => facility.name === item)
//                          ?.icon
//                      }
//                    </div>
//                    <p>{item}</p>
//                  </div>
//                ))}
//              </div>
//            </div>

//            <div>
//              <h2>How long do you want to stay?</h2>
//              <div className="date-range-calendar">
//                <DateRange ranges={dateRange} onChange={handleSelect} />
//                {dayCount > 1 ? (
//                  <h2>
//                    ${listing.price} x {dayCount} nights
//                  </h2>
//                ) : (
//                  <h2>
//                    ${listing.price} x {dayCount} night
//                  </h2>
//               )}

//                <h2>Total price: ${listing.price * dayCount}</h2>
//                <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
//               <p>End Date: {dateRange[0].endDate.toDateString()}</p>

//               <button className="button" type="submit" onClick={handleSubmit}>
//                 BOOKING
//                </button>
//              </div>
//            </div>
//         </div>
//        </div>

//        <Footer />
//      </>
//   );
// };

// export default ListingDetails;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { facilities } from "../data";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { db } from "../firebase"; // Correct import path for firebase
// import { getDoc, doc } from "firebase/firestore";

// import "../styles/ListingDetails.scss";

// const ListingDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const { listingId } = useParams();
//   const [listing, setListing] = useState(null);
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   useEffect(() => {
//     const getListingDetails = async () => {
//       try {
//         if (!listingId) {
//           console.log("Listing ID is empty!");
//           return;
//         }

//         const docRef = doc(db, "listings", listingId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setListing(docSnap.data());
//           setLoading(false);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (err) {
//         console.log("Fetch Listing Details Failed", err.message);
//       }
//     };

//     getListingDetails();
//   }, [listingId]);

//   const handleSelect = (ranges) => {
//     setDateRange([ranges.selection]);
//   };

//   const handleSubmit = async () => {
//     try {
//       window.location.href = "/Booking";

//       console.log("Booking submitted!");
//     } catch (err) {
//       console.log("Submit Booking Failed.", err.message);
//     }
//   };

//   const start = new Date(dateRange[0].startDate);
//   const end = new Date(dateRange[0].endDate);
//   const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <div className="listing-details">
//         <div className="title">
//           <h1>{listing.type}</h1>
//         </div>
//         <div className="photos">
//           {listing.photos?.map((photo, index) => (
//             <img src={photo} alt={`Photo ${index}`} key={index} />
//           ))}
//         </div>
//         <h2>
//           {listing.type} in {listing.city}, {listing.state}, {listing.country}
//         </h2>
//         <p>
//           {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
//           {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
//         </p>
//         <hr />
//         <h3>Description</h3>
//         <p>{listing.description}</p>
//         <hr />
//         <div className="booking">
//           <div>
//             <h2>What this place offers?</h2>
//             <div className="amenities">
//               {listing.amenities?.map((item, index) => (
//                 <div className="facility" key={index}>
//                   <div className="facility_icon">
//                     {facilities.find((facility) => facility.name === item)?.icon}
//                   </div>
//                   <p>{item}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//             <h2>How long do you want to stay?</h2>
//             <div className="date-range-calendar">
//               <DateRange ranges={dateRange} onChange={handleSelect} />
//               {dayCount > 1 ? (
//                 <h2>₹{listing.price} x {dayCount} nights</h2>
//               ) : (
//                 <h2>₹{listing.price} x {dayCount} night</h2>
//               )}
//               <h2>Total price: ${listing.price * dayCount}</h2>
//               <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
//               <p>End Date: {dateRange[0].endDate.toDateString()}</p>
//               <button className="button" type="submit" onClick={handleSubmit}>
//                 BOOKING
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ListingDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase"; // Correct import path for firebase
import { getDoc, doc, setDoc, collection, addDoc } from "firebase/firestore"; // Update imports

import "../styles/ListingDetails.scss";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        if (!listingId) {
          console.log("Listing ID is empty!");
          return;
        }

        const docRef = doc(db, "listings", listingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListing(docSnap.data());
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.log("Fetch Listing Details Failed", err.message);
      }
    };

    getListingDetails();
  }, [listingId]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSubmit = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.uid;
      if (!userId) {
        console.log("User not logged in!");
        return;
      }

      const tripListRef = collection(db, "tripList");
      await addDoc(tripListRef, {
        userId: userId,
        listingId: listingId,
      });

      console.log("Booking submitted!");
      window.location.href = "/Booking";
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.type}</h1>
        </div>
        <div className="photos">
          {listing.photos?.map((photo, index) => (
            <img src={photo} alt={`Photo ${index}`} key={index} />
          ))}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.state}, {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities?.map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {facilities.find((facility) => facility.name === item)?.icon}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>₹{listing.price} x {dayCount} nights</h2>
              ) : (
                <h2>₹{listing.price} x {dayCount} night</h2>
              )}
              <h2>Total price: ₹{listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
