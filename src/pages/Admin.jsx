// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase.js'; // Import Firebase firestore instance
// import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Correct imports for Firestore methods
// import './AdminDashboard.scss'; // Import CSS file for styling


// export default function AdminDashboard() {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const listingsCollection = collection(db, 'listings');
//         const listingsSnapshot = await getDocs(listingsCollection);
//         const listingsData = listingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setListings(listingsData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching listings:', error);
//       }
//     };

//     fetchListings();
//   }, []);

//   const handleAccept = async (id) => {
//     alert("Listing added successfully");
//   };

//   const handleReject = async (id) => {
//     try {
//       // Perform reject action (e.g., notify user)
//       console.log('Listing rejected:', id);
//       // Optionally, remove the listing from the database
//       await deleteDoc(doc(db, 'listings', id));
//       // Update state to remove the rejected listing
//       setListings(listings.filter(listing => listing.id !== id));
//       // Alert message
//       alert('Listing rejected successfully');
//     } catch (error) {
//       console.error('Error rejecting listing:', error);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="listings-grid">
//           {listings.map((listing, index) => (
//             <div key={index} className="listing">
//               <h2>{listing.aptSuite}</h2>
//               <p>Street Address: {listing.streetAddress}</p>
//               <p>City: {listing.city}</p>
//               <p>State: {listing.state}</p>
//               <p>Country: {listing.country}</p>
//               <p>Category: {listing.category}</p>
//               <p>Type: {listing.type}</p>
//               <p>Guest Count: {listing.guestCount}</p>
//               <p>Bathroom Count: {listing.bathroomCount}</p>
//               <p>Bedroom Count: {listing.bedroomCount}</p>
//               <p>Bed Count: {listing.bedCount}</p>
//               <p>Price: {listing.price}</p>
//               <p>Amenities:</p>
//               <ul>
//                 {listing.amenities.map((amenity, index) => (
//                   <li key={index}>{amenity}</li>
//                 ))}
//               </ul>
//               {listing.photos && listing.photos.length > 0 && (
//                 <div>
//                   <p>Photos:</p>
//                   <div className="photos">
//                     {listing.photos.map((photo, index) => (
//                       <img key={index} src={photo} alt={`Photo ${index}`} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="button-group">
//                 <button onClick={() => handleAccept(listing.id)}>Accept</button>
//                 <button onClick={() => handleReject(listing.id)}>Reject</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { db } from '../firebase.js'; // Import Firebase firestore instance
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Correct imports for Firestore methods
import '../styles/AdminDashboard.scss'; // Import SCSS file for styling

export default function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsCollection = collection(db, 'listings');
        const listingsSnapshot = await getDocs(listingsCollection);
        const listingsData = listingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleAccept = async (id) => {
    alert("Listing added successfully");
  };

  const handleReject = async (id) => {
    try {
      // Perform reject action (e.g., notify user)
      console.log('Listing rejected:', id);
      // Optionally, remove the listing from the database
      await deleteDoc(doc(db, 'listings', id));
      // Update state to remove the rejected listing
      setListings(listings.filter(listing => listing.id !== id));
      // Alert message
      alert('Listing rejected successfully');
    } catch (error) {
      console.error('Error rejecting listing:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="listings-grid">
          {listings.map((listing, index) => (
            <div key={index} className="listing">
              <h2>{listing.aptSuite}</h2>
              <p>Street Address: {listing.streetAddress}</p>
              <p>City: {listing.city}</p>
              <p>State: {listing.state}</p>
              <p>Country: {listing.country}</p>
              <p>Category: {listing.category}</p>
              <p>Type: {listing.type}</p>
              <p>Guest Count: {listing.guestCount}</p>
              <p>Bathroom Count: {listing.bathroomCount}</p>
              <p>Bedroom Count: {listing.bedroomCount}</p>
              <p>Bed Count: {listing.bedCount}</p>
              <p>Price: {listing.price}</p>
              <p>Amenities:</p>
              <ul>
                {listing.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
              {listing.photos && listing.photos.length > 0 && (
                <div>
                  <p>Photos:</p>
                  <div className="photos">
                    {listing.photos.map((photo, index) => (
                      <img key={index} src={photo} alt={`Photo ${index}`} />
                    ))}
                  </div>
                </div>
              )}
              <div className="button-group">
                <button className='accept' onClick={() => handleAccept(listing.id)}>Accept</button>
                <button className='reject' onClick={() => handleReject(listing.id)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

