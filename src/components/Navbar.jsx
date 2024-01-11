import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../services/firebase-config';
import { alertHandler, logout } from '../services/store/slices/authSlice';
function Navbar() {
    const { currentUser, userDetails } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    async function handleVerification() {
        try {
            await sendEmailVerification(auth.currentUser);
            dispatch(alertHandler({ show: true, msg: "Verification mail sent successfully!" }))
            dispatch(logout());
            Navigate("/login");
        } catch (err) {
            dispatch(alertHandler({ show: true, msg: err.message }));
        }
    }
    return (
        <header className="navbar bg-base-100 shadow-md justify-between">
            <Link to="/">
                <div className="btn btn-ghost text-xl">
                    Calculate Daily
                </div>
            </Link>
            <ul className="flex items-center gap-4">
                {currentUser && !currentUser.isEmailVerified && <li><button className='btn btn-success' onClick={handleVerification}>Veriry Email</button></li>}
                {
                    currentUser ?
                        (
                            <Link to="/profile">
                                <li tabIndex={0} role="button" className="btn btn-ghost">
                                    {userDetails?.userName && userDetails?.designation ?
                                        <UserCircleIcon className='w-10 h-10' />
                                        : <p>Please complete your profile</p>
                                    }
                                </li>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <li><button className='btn btn-info'>Log in</button></li>
                            </Link>
                        )
                }
            </ul>
        </header>
    )
}

export default Navbar