import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const dispatch=useDispatch()
    if (!user) return null;
    const {_id,firstName,lastName,age,gender,about,photoURL,phoneNumber}=user;
    const handleSendRequest=async(status,userId)=>{
      try{
        const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true})
        
        dispatch(removeUserFromFeed(userId))
      }
      catch(err){}

    }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='my-3'>
    <img
      src={photoURL}
      alt="photo"
      className='w-4/5' />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    {age && gender &&(
        <p>{age+ ", "+gender}</p>
    )}
    <p>{about}</p>
    <p>{phoneNumber}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary"
      onClick={()=>handleSendRequest("ignored",_id)}
      >Ignore</button>
      <button className="btn btn-secondary"
      onClick={()=>handleSendRequest("interested",_id)}
      >Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard