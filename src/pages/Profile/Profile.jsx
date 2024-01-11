import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile from "../../assets/Profile.jpg";
import { logout } from '../../services/store/slices/authSlice';
import ProfileForm from "./ProfileForm";

function Profile() {
    const dispatch = useDispatch();
    const { currentUser,userDetails} = useSelector((state) => state.auth);
    const [editMode, setEditMode] = useState(false);
    const Navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        Navigate("/login");
    }

    function changeMode() {
        setEditMode(prev => !prev);
    }
    return (
        <div className="card bg-base-100 shadow-xl max-w-[45rem] mx-auto p-6 min-h-[23rem] flex-row">
            <figure className='avatar m-auto mr-16'>
                <div className='w-32 rounded-full' >
                    <img src={profile} alt="profile" />
                </div>
            </figure>
            <div className="card-body p-2 flex-row w-full ">
                {
                    editMode ?
                        (<ProfileForm changeMode={changeMode}/>)
                        :
                        (<div className="w-full h-full *:mb-4">
                            Email: <p>{currentUser?.email}</p>
                            Email verify status: <p>{currentUser?.isEmailVerified ? "Yes" : "No"}</p>
                            UserName: <p>{userDetails?.userName}</p>
                            Degisnation: <p>{userDetails?.designation}</p>
                            <button type='button' className="btn btn-success w-28" onClick={changeMode}>Edit</button>
                        </div>)
                }
                <div className="card-actions justify-end">
                    <button className="btn btn-info" onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Profile