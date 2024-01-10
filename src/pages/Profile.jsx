import React, { useEffect, useRef, useState } from 'react'
import profile from "../assets/Profile.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase-config';
import { updateProfile } from '../services/store/slices/authSlice';

function Profile() {
    const { currentUser, userDetails } = useSelector((state) => state.auth);
    const [editMode, setEditMode] = useState(true);
    const userNameRef = useRef();
    const designationRef = useRef();
    const dispatch = useDispatch();

    useEffect(()=>{
        getFirestoreData();
    },[])
    async function getFirestoreData (){
        const storageData = await getDocs(collection(db,"currentUser"));
        console.log(storageData);
    }
    
    async function profileSubmitHandler(e){
        e.preventDefault();
        const profileDetails= {
            ...currentUser,
            userName:userNameRef.current.value,
            designation: designationRef.current.value,
        }
        dispatch(updateProfile(profileDetails));
        try{
            await setDoc(doc(db,"currentUser",currentUser.uid),profileDetails);
        }catch(err){
            console.log("err from profile");
        }
        changeMode();
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
                        (<form className='h-full w-full' onSubmit={profileSubmitHandler}>
                            Email:<input type="email" value={currentUser.email} disabled className="input input-sm input-bordered block mb-3" />
                            Email verify status:<input type="text" value={currentUser.isEmailVerified? "Yes": "No"} disabled className="input input-sm input-bordered block mb-3" />
                            UserName:<input type="text" className="input input-sm input-bordered block mb-3" ref={userNameRef}/>
                            Degisnation<input type="text" className="input input-sm input-bordered block mb-3" ref={designationRef}/>
                            <button type='submit' className="btn btn-success w-28">Add</button>
                        </form>)
                        :
                        (<div className="w-full h-full *:mb-5">
                            Email: <p>{currentUser.email}</p>
                            Email verify status: <p>{currentUser.isEmailVerified? "Yes": "No"}</p>
                            UserName: <p>{userNameRef?.current.value}</p>
                            Degisnation: <p>{designationRef?.current.value}</p>
                            <button type='button' className="btn btn-success w-28" onClick={changeMode}>Edit</button>
                        </div>)
                }
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Profile