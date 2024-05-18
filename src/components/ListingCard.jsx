// import { useState } from "react";
// import "../styles/ListingCard.scss";
// import {
//   ArrowForwardIos,
//   ArrowBackIosNew,
//   Favorite,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setWishList } from "../redux/state";

// const ListingCard = ({
//   listingId,
//   creator,
//   listingPhotoPaths,
//   city,
//   state,
//   country,
//   category,
//   type,
//   price,
//   startDate,
//   endDate,
//   totalPrice,
//   booking,
// }) => {
//   /* SLIDER FOR IMAGES */
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
//     );
//   };

//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   /* ADD TO WISHLIST */
//   const user = useSelector((state) => state.user);
//   const wishList = user?.wishList || [];

//   const isLiked = wishList?.find((item) => item?._id === listingId);

//   const patchWishList = async () => {
//     if (user?._id !== creator._id) {
//     const response = await fetch(
//       `http://localhost:3001/users/${user?._id}/${listingId}`,
//       {
//         method: "PATCH",
//         header: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     dispatch(setWishList(data.wishList));
//   } else { return }
//   };

//   return (
//     <div
//       className="listing-card"
//       onClick={() => {
//         navigate(`/properties/${listingId}`);
//       }}
//     >
//       <div className="slider-container">
//         <div
//           className="slider"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {listingPhotoPaths?.map((photo, index) => (
//             <div key={index} className="slide">
//               <img
//                 src={`http://localhost:3001/${photo?.replace("public", "")}`}
//                 alt={`photo ${index + 1}`}
//               />
//               <div
//                 className="prev-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToPrevSlide(e);
//                 }}
//               >
//                 <ArrowBackIosNew sx={{ fontSize: "15px" }} />
//               </div>
//               <div
//                 className="next-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToNextSlide(e);
//                 }}
//               >
//                 <ArrowForwardIos sx={{ fontSize: "15px" }} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <h3>
//         {city}, {state}, {country}
//       </h3>
//       <p>{category}</p>

//       {!booking ? (
//         <>
//           <p>{type}</p>
//           <p>
//             <span>${price}</span> per night
//           </p>
//         </>
//       ) : (
//         <>
//           <p>
//             {startDate} - {endDate}
//           </p>
//           <p>
//             <span>${totalPrice}</span> total
//           </p>
//         </>
//       )}

//       <button
//         className="favorite"
//         onClick={(e) => {
//           e.stopPropagation();
//           patchWishList();
//         }}
//         disabled={!user}
//       >
//         {isLiked ? (
//           <Favorite sx={{ color: "red" }} />
//         ) : (
//           <Favorite sx={{ color: "white" }} />
//         )}
//       </button>
//     </div>
//   );
// };

// export default ListingCard;

//////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setWishList } from "../redux/state";
// import { doc, updateDoc, arrayUnion } from "firebase/firestore"; // Import arrayUnion to add elements to an array
// import { db } from "../firebase";
// //import "../styles/ListingCard.scss";

// const ListingCard = ({
//   listingId,
//   creator,
//   listingPhotoPaths,
//   city,
//   state,
//   country,
//   category,
//   type,
//   price,
//   startDate,
//   endDate,
//   totalPrice,
//   booking,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const wishList = user?.wishList || [];
//   //const isLiked = wishList?.find((item) => item?._id === listingId);

//   useEffect(() => {
//     setCurrentIndex(0); // Reset current index when the listing changes
//   }, [listingId]);

//   const goToPrevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
//     );
//   };

//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
//   };


//   const addToWishList = async () => {
//     if (!user || user.uid === creator.uid) return;

//     try {
//       const userRef = doc(db, "users", user.uid);
//       const updatedWishList = isLiked
//         ? wishList.filter(item => item._id !== listingId) // Remove item from wishlist if already liked
//         : [...wishList, { _id: listingId }]; // Add item to wishlist if not already liked

//       await updateDoc(userRef, {
//         wishList: updatedWishList,
//       });
//       dispatch(setWishList(updatedWishList));
//     } catch (error) {
//       console.error("Error adding to wish list:", error);
//     }
//   };


//   // Recalculate isLiked based on updated Redux state
//   const isLiked = useSelector((state) =>
//     state.user?.wishList?.find((item) => item?._id === listingId)
//   );

//   return (
//     <div
//       className="listing-card"
//       onClick={() => navigate(`/properties/${listingId}`)}
//     >
//       <div className="slider-container">
//         <div
//           className="slider"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {listingPhotoPaths?.map((photo, index) => (
//             <div key={index} className="slide">
//               <img
//                 src={`http://localhost:3001/${photo?.replace("public", "")}`}
//                 alt={`${photo} ${index + 1}`}
//               />
//               <div
//                 className="prev-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToPrevSlide();
//                 }}
//               >
//                 <ArrowBackIosNew sx={{ fontSize: "15px" }} />
//               </div>
//               <div
//                 className="next-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToNextSlide();
//                 }}
//               >
//                 <ArrowForwardIos sx={{ fontSize: "15px" }} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <h3>
//         {city}, {state}, {country}
//       </h3>
//       <p>{category}</p>

//       {!booking ? (
//         <>
//           <p>{type}</p>
//           <p>
//             <span>${price}</span> per night
//           </p>
//         </>
//       ) : (
//         <>
//           <p>
//             {startDate} - {endDate}
//           </p>
//           <p>
//             <span>${totalPrice}</span> total
//           </p>
//         </>
//       )}

//       <button
//         className="favorite"
//         onClick={(e) => {
//           e.stopPropagation();
//           addToWishList();
//         }}
//       >
//         {isLiked ? (
//           <Favorite sx={{ color: "red" }} />
//         ) : (
//           <Favorite sx={{ color: "white" }} />
//         )}
//       </button>

//     </div>
//   );
// };

// export default ListingCard;

//////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setWishList } from "../redux/state";
// import { doc, updateDoc } from "firebase/firestore"; // Removed arrayUnion as it's not used
// import { db } from "../firebase";
// import "../styles/ListingCard.scss";

// const ListingCard = ({
//   listingId,
//   creator,
//   listingPhotoPaths,
//   city,
//   state,
//   country,
//   category,
//   type,
//   price,
//   startDate,
//   endDate,
//   totalPrice,
//   booking,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const wishList = user?.wishList || [];

//   useEffect(() => {
//     setCurrentIndex(0); // Reset current index when the listing changes
//   }, [listingId]);

//   const goToPrevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
//     );
//   };

//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
//   };

//   const addToWishList = async () => {
//     if (!user || user.uid === creator.uid) return;

//     try {
//       const userRef = doc(db, "users", user.uid);
//       const updatedWishList = isLiked
//         ? wishList.filter((item) => item._id !== listingId) // Remove item from wishlist if already liked
//         : [...wishList, { _id: listingId }]; // Add item to wishlist if not already liked

//       await updateDoc(userRef, {
//         wishList: updatedWishList,
//       });
//       dispatch(setWishList(updatedWishList));
//     } catch (error) {
//       console.error("Error adding to wish list:", error);
//     }
//   };

//   // Recalculate isLiked based on updated Redux state
//   const isLiked = useSelector((state) =>
//     state.user?.wishList?.find((item) => item?._id === listingId)
//   );

//   return (
//     <div
//       className="listing-card"
//       onClick={() => navigate(`/properties/${listingId}`)}
//     >
//       <div className="slider-container">
//         <div
//           className="slider"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {listingPhotoPaths?.map((photo, index) => (
//             <div key={index} className="slide">
//               <img
//                 src={`http://localhost:3001/${photo?.replace("public", "")}`}
//                 alt={`${photo} ${index + 1}`}
//               />
//               <div
//                 className="prev-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToPrevSlide();
//                 }}
//               >
//                 <ArrowBackIosNew sx={{ fontSize: "15px" }} />
//               </div>
//               <div
//                 className="next-button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToNextSlide();
//                 }}
//               >
//                 <ArrowForwardIos sx={{ fontSize: "15px" }} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <h3>
//         {city}, {state}, {country}
//       </h3>
//       <p>{category}</p>

//       {!booking ? (
//         <>
//           <p>{type}</p>
//           <p>
//             <span>${price}</span> per night
//           </p>
//         </>
//       ) : (
//         <>
//           <p>
//             {startDate} - {endDate}
//           </p>
//           <p>
//             <span>${totalPrice}</span> total
//           </p>
//         </>
//       )}

//       <div
//         className="favorite"
//         onClick={(e) => {
//           e.stopPropagation(); // Stop the event from bubbling up to the parent div
//           addToWishList();
//         }}
//         style={{ cursor: 'pointer', display: 'inline-block' }}
//       >
//         {isLiked ? (
//           <Favorite sx={{ color: "red" }} />
//         ) : (
//           <Favorite sx={{ color: "white" }} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListingCard;


import React, { useState, useEffect } from "react";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  state,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishList = useSelector((state) => state.user?.wishList || []);

  // Calculate isLiked in a separate function that is called when wishList changes
  const isLiked = () => {
    return wishList.some((item) => item._id === listingId);
  };

  useEffect(() => {
    setCurrentIndex(0); 
  }, [listingId]);

    const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // ... (rest of the component code) ...

  const addToWishList = async () => {
    if (!user || user.uid === creator.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);

      // Use arrayUnion to add and arrayRemove to remove items from wishList
      await updateDoc(userRef, {
        wishList: isLiked()
          ? arrayRemove({ _id: listingId }) // Remove from wishList
          : arrayUnion({ _id: listingId }) // Add to wishList
      });

      dispatch(setWishList(isLiked() ? wishList.filter(item => item._id !== listingId) : [...wishList, { _id: listingId }]));
    } catch (error) {
      console.error("Error adding to wish list:", error);
    }
  };

  return (
    // ... (rest of the component code) ...
<div
      className="listing-card"
      onClick={() => navigate(`/properties/${listingId}`)}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`${photo} ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {state}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>${totalPrice}</span> total
          </p>
        </>
      )}

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          addToWishList();
        }}
      >
        {isLiked() ? ( // Call isLiked() to get the current status
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
      </div>

    // ... (rest of the component code) ...
  );
};

export default ListingCard;



