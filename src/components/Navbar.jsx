import { UserCircleIcon } from '@heroicons/react/24/outline';
import { sendEmailVerification } from 'firebase/auth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase-config';
import { setStorageData } from '../services/store/api/authThunk';
import { alertHandler, logout, toggleThemeHandler } from '../services/store/slices/authSlice';


function Navbar() {
    const { currentUser, userDetails} = useSelector((state) => state.auth);
    const { totalExpense } = useSelector((state) => state.expense);
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

    function handleThemeChange(){
        dispatch(toggleThemeHandler());
    }
    async function handlePremium(){
        await dispatch(setStorageData({
            ...userDetails,
            premium:true,
        }))
        dispatch(toggleThemeHandler());
    }
    return (
        <header className="navbar bg-base-100 shadow-md justify-between">
            <Link to="/">
                <div className="btn btn-ghost text-xl">
                    Calculate Daily
                </div>
            </Link>
            <ul className="flex items-center gap-4">
                {userDetails?.premium && <input type="checkbox" className="toggle" onChange={handleThemeChange}/>}

                {
                    currentUser && totalExpense >= 10000 && !userDetails?.premium &&
                    <li><button className='btn btn-warning' onClick={handlePremium}>Activate Premium</button></li>
                }
                
                {currentUser && !currentUser?.isEmailVerified && <li><button className='btn btn-success' onClick={handleVerification}>Verify Email</button></li>}
                {
                    currentUser ?
                        (
                            <Link to="/profile">
                                <li tabIndex={0} role="button" className="btn btn-ghost">
                                    {userDetails?.userName?.length && userDetails?.designation?.length ?
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