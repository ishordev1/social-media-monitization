import React, { useEffect, useState } from 'react'
import BrandCard from '../../component/BrandCard'
import { getUserByRole } from '../../service/UserService';
import { toast } from 'react-toastify';

const UserHome = () => {
  const [brands,setBrands]=useState([]);
useEffect(()=>{
getUserByRole("brand").then((res)=>{
  setBrands(res);
  // console.log("data" + JSON.stringify(brands));
  // toast.success('Brands fetched successfully!');
}).catch(err=>{
  console.error("Error fetching brands:", err);
  toast.error('Error fetching brands: ' + err.message);
})
},[])

  
   return (
     <div className="container mx-auto px-4 py-8 ">
       
       <h1 className=" mt-3 text-center text-3xl font-bold text-indigo-800 mb-8">Brands Campaign</h1>
       <div className=" d-flex flex-wrap justify-content-center">
         {brands && brands.map(brand => (
           <BrandCard key={brand.userId} brand={brand} />
         ))}
       </div>
     </div>
   );
 };

export default UserHome
