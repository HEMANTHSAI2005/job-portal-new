import React from 'react'
import {assets} from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppContext} from '../context/AppContext';
import { useContext } from 'react';

const Navbar = () => {
    
    const {openSignIn} = useClerk()
    console.log("openSignIn function:", openSignIn);
    
    const {user} = useUser()

    const navigate = useNavigate()

    const {setShowRecruiterLogin} = useContext(AppContext)
    

   return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
      <img onClick={() => navigate('/')} className='cursor-pointer' src = {assets.logo} alt = ""/>
      {
        user
        ?
        <div className='flex items-center gap-3'>
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
            <UserButton />
        </div>
        :
        <div className='flex gap-4 max-sm:text-xs'>
            <button onClick={e => setShowRecruiterLogin(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Recruiter Login</button>
{/*         <button onClick={e => openSignIn()} className="bg-gray-600 text-white px-4 py-2 rounded-md">Login</button> */}
            <button onClick={e => {console.log('Login button clicked'); openSignIn();}} className="bg-gray-600 text-white px-4 py-2 rounded-md">Login</button>
        </div>
      }
        
      </div>
    </div>
  )
}

export default Navbar
