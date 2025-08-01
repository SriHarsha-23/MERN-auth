import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [isEmailSent, setISEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setisOtpSubmited] = useState(false)

    const inputRefs = React.useRef([]);
    const handleInput = (e, index) => {
      if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
     
    const hadlekeyDown = (e, index) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  
    const handlepaste = (e) => {
      const paste = e.clipboardData.getData('text');
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    }

    const onSubmitEmail = async (e)=>{
      e.preventDefault();
      try{
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp',{email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setISEmailSent(true)
      }catch(error){
        toast.error(error.message)
      }
    }


    const onSubmitOtp = async (e)=>{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e =>e.value)
      setOtp(otpArray.join(''))
      setisOtpSubmited(true)
    }

    const onSubmitNewPassword = async (e) =>{
      e.preventDefault();
      try{

        const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email,otp,newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && navigate('/login')
      }catch(error){
        toast.error(error.message)
      }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-green-100 relative'>
    <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

{!isEmailSent && 

    <form onSubmit={onSubmitEmail} className='bg-[#A3D9A5] p-10 rounded-lg shadow-lg w-96 text-sm'>
      <h1 className='text-white text-3xl font-semibold text-center mb-4'>Reset password</h1>
      <p className='text-center mb-6 text-black text-sm'>Enter Your Registered Email</p>
      <div className='mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-md'>
        <img src={assets.mail_icon} alt="" className='w-3 h-3' />
        <input type='email' placeholder='Email id' className='bg-transparent outline-none w-full' 
        value={email} onChange={e => setEmail(e.target.value)}required/>
      </div>
      <button className='w-full py-2.5 bg-gradient-to-r from-green-300 to-green-700 cursor-pointer text-white rounded-full mt-3'>Submit</button>
    </form>
}

{!isOtpSubmitted && isEmailSent &&
<form onSubmit={onSubmitOtp} className='bg-[#A3D9A5] p-10 rounded-lg shadow-lg w-96 text-sm'>
  <h1 className='text-white text-3xl font-semibold text-center mb-4'>Reset Password OTP</h1>
  <p className='text-center mb-6 text-black text-sm'>Enter the OTP sent to your email</p>
  <div className='flex justify-between mb-8'>
    {Array(6).fill(0).map((_, index) => (
      <input
        type="text"
        maxLength='1'
        key={index}
        required
        className='w-12 h-12 bg-white text-black text-center text-xl rounded-md shadow-md'
        ref={e => inputRefs.current[index] = e}
        onInput={(e) => handleInput(e, index)}
        onKeyDown={(e) => hadlekeyDown(e, index)}
        onPaste={handlepaste}
      />
    ))}
  </div>
  <button type="submit" className='w-full py-2.5 bg-gradient-to-r from-green-300 to-green-700 text-white rounded-full cursor-pointer'>Submit</button>
</form>
}

{isOtpSubmitted && isEmailSent &&
<form onSubmit={onSubmitNewPassword} className='bg-[#A3D9A5] p-10 rounded-lg shadow-lg w-96 text-sm'>
      <h1 className='text-white text-3xl font-semibold text-center mb-4'>New Password</h1>
      <p className='text-center mb-6 text-black text-sm'>Enter New Password</p>
      <div className='mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-md'>
        <img src={assets.lock_icon} alt="" className='w-3 h-3' />
        <input type='password' placeholder='Password' className='bg-transparent outline-none w-full' 
        value={newPassword} onChange={e => setnewPassword(e.target.value)}required/>
      </div>
      <button className='w-full py-2.5 bg-gradient-to-r from-green-300 to-green-700 cursor-pointer text-white rounded-full mt-3'>Submit</button>
    </form>
}


  </div>
  )
}

export default ResetPassword;
