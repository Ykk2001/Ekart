import React from 'react'
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children,adminOnly=false}) {
   const {User}=useSelector((store)=>store.user);
    console.log("user from ProtectedRoute",User);
   if(!User)
   {
    return <Navigate to='/login'/>
   }//if user is not found then navigate to the login page

   if(adminOnly && User.role!=='admin')//true && true==>true if role is not admin
   {
    return <Navigate to='/'/>
   }//if user is not admin then naivigate to the home page

  return (
    <div>
       {children} 
    </div>
  )
}//ProtectedRoute Does ->if user is not there then it will navigate to the login page -->without login user cant access the cart it only access the Home Page and Products Page  -->if user is not admin then it will not access the dashboard Page  
