import React, { use, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [gender, setGender] = useState(user.gender|| "");
  const [age, setAge] = useState(user.age|| "");
  const [about, setAbout] = useState(user.about|| "");
  const [error, setError] = useState("");
  const [showToast,setShowToast]=useState(false)
  const dispatch = useDispatch();
  const savaProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, photoURL, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      },3000)
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10 ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="flex flex-col gap-4">
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1">Photo URL:</span>
                  </div>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
              <p className="text-red">{error}</p>
              <div className="card-actions justify-center m-4">
                <button className="btn btn-primary" onClick={savaProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, photoURL, gender, about }}
        />
      </div>
      
        { showToast && (
            <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile Saved successfully.</span>
            </div>
            </div>
        )
        }
      
    </>
  );
};

export default EditProfile;
