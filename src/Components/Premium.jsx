import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {
    const handleBuyClick=async(type)=>{
        const order=await axios.post(BASE_URL+"/payment/create",{
            membershipType: type,
        },{withCredentials:true})

        const {orderId,amount,currency,notes,keyId}=order.data;
        console.log("Order ID sent to Razorpay:", orderId);
        const options = {
        key: keyId, 
        amount, 
        currency,
        name: 'Dev Tinder',
        description: 'Connection to other developers',
        order_id: orderId, 
        prefill: {
          name: notes.firstname+" "+notes.lastname,
          email: notes.emailId,
          contact: "9999999999"
        },
        theme: {
          color: '#F37254'
        },
      };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }
  return (
   <div className='m-10'>
    <div className="flex w-full">
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className='text-3xl font-bold'>Silver Membership</h1>
    <ul>
        <li> - Chat with Other People</li>
        <li> - 100 connection Requests per day </li>
        <li> - Blue Tick </li>
        <li> - 3 months</li>
    </ul>
    <button onClick={()=>{handleBuyClick("silver")}}  className="btn btn-primary">Buy Silver</button>
  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className='text-3xl font-bold'>Gold Membership</h1>
    <ul>
        <li> - Chat with Other People</li>
        <li> - Infinite connection Requests per day </li>
        <li> - Blue Tick </li>
        <li> - 6 months</li>
    </ul>
    <button onClick={()=>{handleBuyClick("gold")}} className="btn btn-secondary">Buy Gold</button>
  </div>
</div>
   </div>
  )
}

export default Premium