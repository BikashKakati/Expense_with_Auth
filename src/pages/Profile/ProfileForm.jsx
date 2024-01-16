import React, { useRef } from 'react'
import { setStorageData} from '../../services/store/api/authThunk';
import { useDispatch, useSelector } from 'react-redux';


function ProfileForm({ changeMode }) {
    const { currentUser, userDetails } = useSelector((state) => state.auth);
    const userNameRef = useRef();
    const designationRef = useRef();
    const dispatch = useDispatch();

    async function profileSubmitHandler(e) {
        e.preventDefault();
        await dispatch(setStorageData({
            ...userDetails,
            userName: userNameRef.current.value,
            designation: designationRef.current.value,
        }))
        changeMode();
    }
    return (
        <form className='h-full w-full' onSubmit={profileSubmitHandler}>
            Email:
            <input type="email"
                className="input input-sm input-bordered block mb-3"
                defaultValue={currentUser.email}
                disabled
            />

            Verify email status:
            <input
                type="text"
                className="input input-sm input-bordered block mb-3"
                defaultValue={currentUser.isEmailVerified ? "Yes" : "No"}
                disabled
            />
            UserName:
            <input
                type="text"
                className="input input-sm input-bordered block mb-3"
                defaultValue={userDetails?.userName}
                ref={userNameRef}
            />
            Degisnation:
            <input
                type="text"
                className="input input-sm input-bordered block mb-3"
                defaultValue={userDetails?.designation}
                ref={designationRef}
            />
            <button type='submit' className="btn btn-success w-28">Add</button>
        </form>
    )
}

export default ProfileForm