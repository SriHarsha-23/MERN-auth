import React, { useContext } from 'react'
import { assets } from "../assets/assets.js";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

//cursor-pointer hover:bg-gray-300 transition-all' onClick={()=>navigate('/profile')}
const Navbar = () => {
    const navigate = useNavigate();
    const  {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContext);

    const sendVerificationotp = async () => {
      try{
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');
        if(data.success){
          toast.success('Verification OTP sent to your email');
          navigate('/email-verify');
        }else{
          toast.error(data.message);
        }

      }catch(error) {
          toast.error(error.message);
      }
    }

    const logout = async () => {
      try{
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/logout');
        data.success && setIsLoggedIn(false);
        data.success && setUserData(false);
        navigate('/');
      }catch (error) {
          toast.error(error.messsage)
      }
    }
  return (
    <div className='w-full flex justify-between items-center  p-4 sm:p-6 sm:px-24 absolute top-0 '>

      <img src={ assets.logo} alt="logo" className='w-36 sm:w-40' />
    { userData ? 
    <div className='w-8 h-8 flex justify-center items-center rounded-full bg-gray-800 text-white relative group cursor-pointer hover:bg-gray-300 transition-all'> 
      { userData.name[0].toUpperCase()}
      <div className='absolute hidden group-hover:block top-full right-0 z-10 text-black rounded p-2'>
        <ul className='list-none m-0 p-2 bg-gray-100 test-sm'>
          {!userData.isAccountVerified && <li onClick={sendVerificationotp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap'>Verify Email</li> }
          <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
        </ul>
      </div>
    </div> 
    : <button onClick={()=>navigate('/login')}  className='flex items-center gap-2 border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Login<img src={assets.arrow_icon}  alt =""/></button>
    }  
      
    </div>
  )
}

export default Navbar;
