// import "../styles/CreateListing.scss";
// import Navbar from "../components/Navbar";
// import { categories, types, facilities } from "../data";

// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { IoIosImages } from "react-icons/io";
// import { useState } from "react";
// import { BiTrash } from "react-icons/bi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer"

// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");

//   /* LOCATION */
//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     province: "",
//     country: "",
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   /* BASIC COUNTS */
//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   /* AMENITIES */
//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = (e) => {
//     const newPhotos = e.target.files;
//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   /* DESCRIPTION */
//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };

//   const creatorId = useSelector((state) => state.user._id);

//   const navigate = useNavigate();

//   const handlePost = async (e) => {
//     e.preventDefault();

//     try {
//       /* Create a new FormData onject to handle file uploads */
//       const listingForm = new FormData();
//       listingForm.append("creator", creatorId);
//       listingForm.append("category", category);
//       listingForm.append("type", type);
//       listingForm.append("streetAddress", formLocation.streetAddress);
//       listingForm.append("aptSuite", formLocation.aptSuite);
//       listingForm.append("city", formLocation.city);
//       listingForm.append("province", formLocation.province);
//       listingForm.append("country", formLocation.country);
//       listingForm.append("guestCount", guestCount);
//       listingForm.append("bedroomCount", bedroomCount);
//       listingForm.append("bedCount", bedCount);
//       listingForm.append("bathroomCount", bathroomCount);
//       listingForm.append("amenities", amenities);
//       listingForm.append("title", formDescription.title);
//       listingForm.append("description", formDescription.description);
//       listingForm.append("highlight", formDescription.highlight);
//       listingForm.append("highlightDesc", formDescription.highlightDesc);
//       listingForm.append("price", formDescription.price);

//       /* Append each selected photos to the FormData object */
//       photos.forEach((photo) => {
//         listingForm.append("listingPhotos", photo);
//       });

//       /* Send a POST request to server */
//       const response = await fetch("http://localhost:3001/properties/create", {
//         method: "POST",
//         body: listingForm,
//       });

//       if (response.ok) {
//         navigate("/");
//       }
//     } catch (err) {
//       console.log("Publish Listing failed", err.message);
//     }
//   };
//   return (
//     <>
//       <Navbar />

//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Province</p>
//                 <input
//                   type="text"
//                   placeholder="Province"
//                   name="province"
//                   value={formLocation.province}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What make your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CreateListing;
/////////////////////////////////////////////////////////



// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import firebase from "firebase/compat/app";
// import { getFirestore } from "firebase/firestore";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/CreateListing.scss";


// import { categories, types, facilities } from "../data";
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { IoIosImages } from "react-icons/io";
// import { BiTrash } from "react-icons/bi";



// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const creatorId = user ? user._id : null;

//   /* LOCATION */
//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     province: "",
//     country: "",
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   /* BASIC COUNTS */
//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   /* AMENITIES */
//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = (e) => {
//     const newPhotos = e.target.files;
//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   /* DESCRIPTION */
//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };

//   const handlePost = async (e) => {
//     e.preventDefault();

//     try {
//       const db = getFirestore();
//       const docRef = await db.collection("listings").add({
//         creator: creatorId,
//         category: category,
//         type: type,
//         streetAddress: formLocation.streetAddress,
//         aptSuite: formLocation.aptSuite,
//         city: formLocation.city,
//         province: formLocation.province,
//         country: formLocation.country,
//         guestCount: guestCount,
//         bedroomCount: bedroomCount,
//         bedCount: bedCount,
//         bathroomCount: bathroomCount,
//         amenities: amenities,
//         title: formDescription.title,
//         description: formDescription.description,
//         highlight: formDescription.highlight,
//         highlightDesc: formDescription.highlightDesc,
//         price: formDescription.price,
//       });
      
//       console.log("Document written with ID: ", docRef.id);
//       navigate("/"); // Navigate to home page after successful post
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Province</p>
//                 <input
//                   type="text"
//                   placeholder="Province"
//                   name="province"
//                   value={formLocation.province}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What make your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CreateListing;

/////////////////////////////////////////////

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getFirestore, addDoc, collection } from "firebase/firestore";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/CreateListing.scss";
// import { categories, types, facilities } from "../data";
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { IoIosImages } from "react-icons/io";
// import { BiTrash } from "react-icons/bi";




// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const creatorId = user ? user._id : null;

//   /* LOCATION */
//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   /* BASIC COUNTS */
//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   /* AMENITIES */
//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = (e) => {
//     const newPhotos = e.target.files;
//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   /* DESCRIPTION */
//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };

//   // const handlePost = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const db = getFirestore();

//   //     // Add the listing document to the 'listings' collection
//   //     const docRef = await addDoc(collection(db, "listings"), {
//   //       creator: creatorId,
//   //       category: category,
//   //       type: type,
//   //       streetAddress: formLocation.streetAddress,
//   //       aptSuite: formLocation.aptSuite,
//   //       city: formLocation.city,
//   //       state: formLocation.state,
//   //       country: formLocation.country,
//   //       guestCount: guestCount,
//   //       bedroomCount: bedroomCount,
//   //       bedCount: bedCount,
//   //       bathroomCount: bathroomCount,
//   //       amenities: amenities,
//   //       title: formDescription.title,
//   //       description: formDescription.description,
//   //       highlight: formDescription.highlight,
//   //       highlightDesc: formDescription.highlightDesc,
//   //       price: formDescription.price,
//   //     });

//   //     console.log("Document written with ID: ", docRef.id);
//   //     navigate("/"); // Navigate to home page after successful post
//   //   } catch (error) {
//   //     console.error("Error adding document: ", error);
//   //   }
//   // };

//   const handlePost = async (e) => {
//     e.preventDefault();
  
//     try {
//       const db = getFirestore();
  
//       // Add the listing document to the 'listings' collection
//       const docRef = await addDoc(collection(db, "listings"), {
//         creator: creatorId, // Include the creator field here
//         category: category,
//         type: type,
//         streetAddress: formLocation.streetAddress,
//         aptSuite: formLocation.aptSuite,
//         city: formLocation.city,
//         state: formLocation.state,
//         country: formLocation.country,
//         guestCount: guestCount,
//         bedroomCount: bedroomCount,
//         bedCount: bedCount,
//         bathroomCount: bathroomCount,
//         amenities: amenities,
//         title: formDescription.title,
//         description: formDescription.description,
//         highlight: formDescription.highlight,
//         highlightDesc: formDescription.highlightDesc,
//         price: formDescription.price,
//       });
     
  
//       console.log("Document written with ID: ", docRef.id);
//       navigate("/"); // Navigate to home page after successful post
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };
  


//   return (
//     <>
//       <Navbar />
//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>State</p>
//                 <input
//                   type="text"
//                   placeholder="State"
//                   name="state"
//                   value={formLocation.state}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What make your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CreateListing;

////////////////////////////****************/////////////////////////////////

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getFirestore, addDoc, collection } from "firebase/firestore";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { categories, types, facilities } from "../data";
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { IoIosImages } from "react-icons/io";
// import { BiTrash } from "react-icons/bi";

// import {app} from "../firebase";
// import 'firebase/storage';
// import 'firebase/firestore';
// import { getStorage } from "firebase/storage";
// import "../styles/CreateListing.scss";


// const db = getFirestore(app);
// const storage = getStorage(app);

// // Function to upload a photo
// async function uploadPhoto(file) {
//   const uploadTask = storage.ref().child(`photos/${file.name}`).put(file);

//   return new Promise((resolve, reject) => {
//     uploadTask.on('state_changed',
//       (snapshot) => {
//         // Progress updates if needed
//       },
//       (error) => {
//         reject(error);
//       },
//       () => {
//         // Upload complete
//         uploadTask.snapshot.ref.getDownloadURL()
//           .then((downloadURL) => {
//             resolve(downloadURL);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//       }
//     );
//   });
// }

// // Function to save photo reference in Firestore
// async function savePhotoReference(photoURL, photoData) {
//   await db.collection('listings').add({
//     url: photoURL,
//     // Add other relevant photo data here (e.g., description, timestamp)
//   });
// }

// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const creatorId = user ? user._id : null;

//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = async (e) => {
//     const newPhotos = e.target.files;
//     const photoURLs = [];

//     for (let i = 0; i < newPhotos.length; i++) {
//       try {
//         const photoURL = await uploadPhoto(newPhotos[i]);
//         photoURLs.push(photoURL);
//       } catch (error) {
//         console.error("Error uploading photo: ", error);
//         // Handle error
//       }
//     }

//     // Save photo references in Firestore
//     photoURLs.forEach(async (photoURL) => {
//       try {
//         await savePhotoReference(photoURL, { /* Add other photo data if needed */ });
//       } catch (error) {
//         console.error("Error saving photo reference: ", error);
//         // Handle error
//       }
//     });

//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };

//   const handlePost = async (e) => {
//     e.preventDefault();
  
//     try {
//       const db = getFirestore();
  
//       // Add the listing document to the 'listings' collection
//       const docRef = await addDoc(collection(db, "listings"), {
//         creator: creatorId, // Include the creator field here
//         category: category,
//         type: type,
//         streetAddress: formLocation.streetAddress,
//         aptSuite: formLocation.aptSuite,
//         city: formLocation.city,
//         state: formLocation.state,
//         country: formLocation.country,
//         guestCount: guestCount,
//         bedroomCount: bedroomCount,
//         bedCount: bedCount,
//         bathroomCount: bathroomCount,
//         amenities: amenities,
//         title: formDescription.title,
//         description: formDescription.description,
//         highlight: formDescription.highlight,
//         highlightDesc: formDescription.highlightDesc,
//         price: formDescription.price,
//       });
     
//       console.log("Document written with ID: ", docRef.id);
//       navigate("/"); // Navigate to home page after successful post
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>State</p>
//                 <input
//                   type="text"
//                   placeholder="State"
//                   name="state"
//                   value={formLocation.state}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What make your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CreateListing;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getFirestore, addDoc, collection } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { categories, types, facilities } from "../data";
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { IoIosImages } from "react-icons/io";
// import { BiTrash } from "react-icons/bi";
// import { app } from "../firebase";

// import "../styles/CreateListing.scss";


// const db = getFirestore(app);
// const storage = getStorage(app);

// // Function to upload a photo
// async function uploadPhoto(file) {
//   const storageRef = ref(storage, `photos/${file.name}`);

//   try {
//     const snapshot = await uploadBytes(storageRef, file);
//     console.log("Uploaded a blob or file!", snapshot);
//     return getDownloadURL(snapshot.ref);
//   } catch (error) {
//     console.error("Error uploading photo: ", error);
//     throw error;
//   }
// }

// // Function to save photo reference along with form data in Firestore
// async function saveListingWithData(listingData) {
//   try {
//     const docRef = await addDoc(collection(db, 'listings'), listingData);
//     console.log("Listing with photo reference added with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error saving listing with photo reference: ", error);
//     throw error;
//   }
// }

// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const creatorId = user ? user._id : null;

//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     state: "",
//     country: "",
//     image: null,
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = async (e) => {
//     const newPhotos = e.target.files;
//     const photoURLs = [];

//     for (let i = 0; i < newPhotos.length; i++) {
//       try {
//         const photoURL = await uploadPhoto(newPhotos[i]);
//         photoURLs.push(photoURL);
//       } catch (error) {
//         console.error("Error uploading photo: ", error);
//         // Handle error
//       }
//     }

//     const listingData = {
//       creator: creatorId,
//       category: category,
//       type: type,
//       streetAddress: formLocation.streetAddress,
//       aptSuite: formLocation.aptSuite,
//       city: formLocation.city,
//       state: formLocation.state,
//       country: formLocation.country,
//       guestCount: guestCount,
//       bedroomCount: bedroomCount,
//       bedCount: bedCount,
//       bathroomCount: bathroomCount,
//       amenities: amenities,
//       photos: photoURLs // Add photo URLs to the listing data
//     };

//     try {
//       await saveListingWithData(listingData);
//       setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
//     } catch (error) {
//       console.error("Error saving listing with photo reference: ", error);
//       // Handle error
//     }
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };

//   const handlePost = async (e) => {
//     e.preventDefault();

//     const listingData = {
//       creator: creatorId,
//       category: category,
//       type: type,
//       streetAddress: formLocation.streetAddress,
//       aptSuite: formLocation.aptSuite,
//       city: formLocation.city,
//       state: formLocation.state,
//       country: formLocation.country,
//       guestCount: guestCount,
//       bedroomCount: bedroomCount,
//       bedCount: bedCount,
//       bathroomCount: bathroomCount,
//       amenities: amenities,
//       photos: formLocation.image,
//       title: formDescription.title,
//       description: formDescription.description,
//       highlight: formDescription.highlight,
//       highlightDesc: formDescription.highlightDesc,
//       price: formDescription.price,
//     };

//     try {
//       await saveListingWithData(listingData);
//       navigate("/"); // Navigate to home page after successful post
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>State</p>
//                 <input
//                   type="text"
//                   placeholder="State"
//                   name="state"
//                   value={formLocation.state}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           name="image"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What makes your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CreateListing;

////////////////////************//////////////////////

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getFirestore, addDoc, collection } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { categories, types, facilities } from "../data";
// import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
// import variables from "../styles/variables.scss";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { IoIosImages } from "react-icons/io";
// import { BiTrash } from "react-icons/bi";
// import { app } from "../firebase";

// import "../styles/CreateListing.scss";

// const db = getFirestore(app);
// const storage = getStorage(app);

// // Function to upload a photo
// async function uploadPhoto(file) {
//   const storageRef = ref(storage, `photos/${file.name}`);

//   try {
//     const snapshot = await uploadBytes(storageRef, file);
//     console.log("Uploaded a blob or file!", snapshot);
//     return getDownloadURL(snapshot.ref);
//   } catch (error) {
//     console.error("Error uploading photo: ", error);
//     throw error;
//   }
// }

// // Function to save photo reference along with form data in Firestore
// async function saveListingWithData(listingData) {
//   try {
//     const docRef = await addDoc(collection(db, 'listings'), listingData);
//     console.log("Listing with photo reference added with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error saving listing with photo reference: ", error);
//     throw error;
//   }
// }

// const CreateListing = () => {
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");
//   const navigate = useNavigate();

//   const [formLocation, setFormLocation] = useState({
//     streetAddress: "",
//     aptSuite: "",
//     city: "",
//     state: "",
//     country: "",
//     image: null,
//   });

//   const handleChangeLocation = (e) => {
//     const { name, value } = e.target;
//     setFormLocation({
//       ...formLocation,
//       [name]: value,
//     });
//   };

//   const [guestCount, setGuestCount] = useState(1);
//   const [bedroomCount, setBedroomCount] = useState(1);
//   const [bedCount, setBedCount] = useState(1);
//   const [bathroomCount, setBathroomCount] = useState(1);

//   const [amenities, setAmenities] = useState([]);

//   const handleSelectAmenities = (facility) => {
//     if (amenities.includes(facility)) {
//       setAmenities((prevAmenities) =>
//         prevAmenities.filter((option) => option !== facility)
//       );
//     } else {
//       setAmenities((prev) => [...prev, facility]);
//     }
//   };

//   const [photos, setPhotos] = useState([]);

//   const handleUploadPhotos = async (e) => {
//     const newPhotos = e.target.files;
//     const photoURLs = [];

//     for (let i = 0; i < newPhotos.length; i++) {
//       try {
//         const photoURL = await uploadPhoto(newPhotos[i]);
//         photoURLs.push(photoURL);
//       } catch (error) {
//         console.error("Error uploading photo: ", error);
//         // Handle error
//       }
//     }

//     setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

//     const listingData = {
//       category: category,
//       type: type,
//       streetAddress: formLocation.streetAddress,
//       aptSuite: formLocation.aptSuite,
//       city: formLocation.city,
//       state: formLocation.state,
//       country: formLocation.country,
//       guestCount: guestCount,
//       bedroomCount: bedroomCount,
//       bedCount: bedCount,
//       bathroomCount: bathroomCount,
//       amenities: amenities,
//       photos: photoURLs, // Add photo URLs to the listing data
//     };

//     try {
//       await saveListingWithData(listingData);
//     } catch (error) {
//       console.error("Error saving listing with photo reference: ", error);
//       // Handle error
//     }
//   };

//   const handleDragPhoto = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(photos);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setPhotos(items);
//   };

//   const handleRemovePhoto = (indexToRemove) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   const [formDescription, setFormDescription] = useState({
//     title: "",
//     description: "",
//     highlight: "",
//     highlightDesc: "",
//     price: 0,
//   });

//   const handleChangeDescription = (e) => {
//     const { name, value } = e.target;
//     setFormDescription({
//       ...formDescription,
//       [name]: value,
//     });
//   };

//   const handlePost = async (e) => {
//     e.preventDefault();

//     const listingData = {
//       category: category,
//       type: type,
//       streetAddress: formLocation.streetAddress,
//       aptSuite: formLocation.aptSuite,
//       city: formLocation.city,
//       state: formLocation.state,
//       country: formLocation.country,
//       guestCount: guestCount,
//       bedroomCount: bedroomCount,
//       bedCount: bedCount,
//       bathroomCount: bathroomCount,
//       amenities: amenities,
//       photos: formLocation.image,
//       title: formDescription.title,
//       description: formDescription.description,
//       highlight: formDescription.highlight,
//       highlightDesc: formDescription.highlightDesc,
//       price: formDescription.price,
//     };

//     try {
//       await saveListingWithData(listingData);
//       navigate("/"); // Navigate to home page after successful post
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <>
//        <Navbar />
//       <div className="create-listing">
//         <h1>Publish Your Place</h1>
//         <form onSubmit={handlePost}>
//           <div className="create-listing_step1">
//             <h2>Step 1: Tell us about your place</h2>
//             <hr />
//             <h3>Which of these categories best describes your place?</h3>
//             <div className="category-list">
//               {categories?.map((item, index) => (
//                 <div
//                   className={`category ${
//                     category === item.label ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => setCategory(item.label)}
//                 >
//                   <div className="category_icon">{item.icon}</div>
//                   <p>{item.label}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>What type of place will guests have?</h3>
//             <div className="type-list">
//               {types?.map((item, index) => (
//                 <div
//                   className={`type ${type === item.name ? "selected" : ""}`}
//                   key={index}
//                   onClick={() => setType(item.name)}
//                 >
//                   <div className="type_text">
//                     <h4>{item.name}</h4>
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="type_icon">{item.icon}</div>
//                 </div>
//               ))}
//             </div>

//             <h3>Where's your place located?</h3>
//             <div className="full">
//               <div className="location">
//                 <p>Street Address</p>
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   name="streetAddress"
//                   value={formLocation.streetAddress}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>Apartment, Suite, etc. (if applicable)</p>
//                 <input
//                   type="text"
//                   placeholder="Apt, Suite, etc. (if applicable)"
//                   name="aptSuite"
//                   value={formLocation.aptSuite}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>City</p>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formLocation.city}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="half">
//               <div className="location">
//                 <p>State</p>
//                 <input
//                   type="text"
//                   placeholder="State"
//                   name="state"
//                   value={formLocation.state}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//               <div className="location">
//                 <p>Country</p>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   name="country"
//                   value={formLocation.country}
//                   onChange={handleChangeLocation}
//                   required
//                 />
//               </div>
//             </div>

//             <h3>Share some basics about your place</h3>
//             <div className="basics">
//               <div className="basic">
//                 <p>Guests</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       guestCount > 1 && setGuestCount(guestCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{guestCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setGuestCount(guestCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bedrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedroomCount(bedroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Beds</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bedCount > 1 && setBedCount(bedCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bedCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBedCount(bedCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="basic">
//                 <p>Bathrooms</p>
//                 <div className="basic_count">
//                   <RemoveCircleOutline
//                     onClick={() => {
//                       bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                   <p>{bathroomCount}</p>
//                   <AddCircleOutline
//                     onClick={() => {
//                       setBathroomCount(bathroomCount + 1);
//                     }}
//                     sx={{
//                       fontSize: "25px",
//                       cursor: "pointer",
//                       "&:hover": { color: variables.pinkred },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="create-listing_step2">
//             <h2>Step 2: Make your place stand out</h2>
//             <hr />

//             <h3>Tell guests what your place has to offer</h3>
//             <div className="amenities">
//               {facilities?.map((item, index) => (
//                 <div
//                   className={`facility ${
//                     amenities.includes(item.name) ? "selected" : ""
//                   }`}
//                   key={index}
//                   onClick={() => handleSelectAmenities(item.name)}
//                 >
//                   <div className="facility_icon">{item.icon}</div>
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>

//             <h3>Add some photos of your place</h3>
//             <DragDropContext onDragEnd={handleDragPhoto}>
//               <Droppable droppableId="photos" direction="horizontal">
//                 {(provided) => (
//                   <div
//                     className="photos"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {photos.length < 1 && (
//                       <>
//                         <input
//                           id="image"
//                           type="file"
//                           name="image"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="alone">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}

//                     {photos.length >= 1 && (
//                       <>
//                         {photos.map((photo, index) => {
//                           return (
//                             <Draggable
//                               key={index}
//                               draggableId={index.toString()}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   className="photo"
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <img
//                                     src={URL.createObjectURL(photo)}
//                                     alt="place"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => handleRemovePhoto(index)}
//                                   >
//                                     <BiTrash />
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                         <input
//                           id="image"
//                           type="file"
//                           style={{ display: "none" }}
//                           accept="image/*"
//                           onChange={handleUploadPhotos}
//                           multiple
//                         />
//                         <label htmlFor="image" className="together">
//                           <div className="icon">
//                             <IoIosImages />
//                           </div>
//                           <p>Upload from your device</p>
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <h3>What makes your place attractive and exciting?</h3>
//             <div className="description">
//               <p>Title</p>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 name="title"
//                 value={formDescription.title}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Description</p>
//               <textarea
//                 type="text"
//                 placeholder="Description"
//                 name="description"
//                 value={formDescription.description}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight</p>
//               <input
//                 type="text"
//                 placeholder="Highlight"
//                 name="highlight"
//                 value={formDescription.highlight}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Highlight details</p>
//               <textarea
//                 type="text"
//                 placeholder="Highlight details"
//                 name="highlightDesc"
//                 value={formDescription.highlightDesc}
//                 onChange={handleChangeDescription}
//                 required
//               />
//               <p>Now, set your PRICE</p>
//               <span>$</span>
//               <input
//                 type="number"
//                 placeholder="100"
//                 name="price"
//                 value={formDescription.price}
//                 onChange={handleChangeDescription}
//                 className="price"
//                 required
//               />
//             </div>
//           </div>

//           <button className="submit_btn" type="submit">
//             CREATE YOUR LISTING
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>

//   );
// };

// export default CreateListing;

///////////////////////////////

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { app } from "../firebase";

import "../styles/CreateListing.scss";

const db = getFirestore(app);
const storage = getStorage(app);

// Function to upload a photo
async function uploadPhoto(file) {
  const storageRef = ref(storage, `photos/${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!", snapshot);
    return getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Error uploading photo: ", error);
    throw error;
  }
}

// Function to save photo reference along with form data in Firestore
async function saveListingWithData(listingData) {
  try {
    
    const docRef = await addDoc(collection(db, 'listings'), listingData);
    console.log("Listing with photo reference added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving listing with photo reference: ", error);
    throw error;
  }
}

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    country: "",
    image: null,
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = async (e) => {
    const newPhotos = e.target.files;
    const photoURLs = [];

    for (let i = 0; i < newPhotos.length; i++) {
      try {
        const photoURL = await uploadPhoto(newPhotos[i]);
        photoURLs.push(photoURL);
      } catch (error) {
        console.error("Error uploading photo: ", error);
        // Handle error
      }
    }

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

    const listingData = {
      category: category,
      type: type,
      streetAddress: formLocation.streetAddress,
      aptSuite: formLocation.aptSuite,
      city: formLocation.city,
      state: formLocation.state,
      country: formLocation.country,
      guestCount: guestCount,
      bedroomCount: bedroomCount,
      bedCount: bedCount,
      bathroomCount: bathroomCount,
      amenities: amenities,
      photos: photoURLs, // Add photo URLs to the listing data
    };

    try {
      await saveListingWithData(listingData);
    } catch (error) {
      console.error("Error saving listing with photo reference: ", error);
      // Handle error
    }
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  // const handlePost = async (e) => {
  //   e.preventDefault();

  //   // Retrieve user ID from local storage
  //   const userId = JSON.parse(localStorage.getItem("user"))?.uid;

  //   console.log(userId)

  //   const listingData = {
  //     userId: userId,
  //     category: category,
  //     type: type,
  //     streetAddress: formLocation.streetAddress,
  //     aptSuite: formLocation.aptSuite,
  //     city: formLocation.city,
  //     state: formLocation.state,
  //     country: formLocation.country,
  //     guestCount: guestCount,
  //     bedroomCount: bedroomCount,
  //     bedCount: bedCount,
  //     bathroomCount: bathroomCount,
  //     amenities: amenities,
  //     photos: formLocation.image,
  //     title: formDescription.title,
  //     description: formDescription.description,
  //     highlight: formDescription.highlight,
  //     highlightDesc: formDescription.highlightDesc,
  //     price: formDescription.price,
  //      // Add user ID to the listing data
  //   };

  //   try {
  //     await saveListingWithData(listingData);
  //     navigate("/"); // Navigate to home page after successful post
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };

  const handlePost = async (e) => {
    e.preventDefault();
  
    // Retrieve user ID from local storage
    const userId = JSON.parse(localStorage.getItem("user"))?.uid;
  
    const listingData = {
      userId: userId,
      category: category,
      type: type,
      streetAddress: formLocation.streetAddress,
      aptSuite: formLocation.aptSuite,
      city: formLocation.city,
      state: formLocation.state,
      country: formLocation.country,
      guestCount: guestCount,
      bedroomCount: bedroomCount,
      bedCount: bedCount,
      bathroomCount: bathroomCount,
      amenities: amenities,
      photos: formLocation.image,
      title: formDescription.title,
      description: formDescription.description,
      highlight: formDescription.highlight,
      highlightDesc: formDescription.highlightDesc,
      price: formDescription.price // Ensure price is included
    };
  
    try {
      await saveListingWithData(listingData);
      navigate("/"); // Navigate to home page after successful post
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  

  return (
    <>
       <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>State</p>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formLocation.state}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          name="image"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What makes your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              <p>Now, set your PRICE</p>
              <span>₹</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>

      <Footer />
    </>

  );
};

export default CreateListing;
