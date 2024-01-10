import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
function Navbar() {
    const { currentUser, userDetails } = useSelector((state) => state.auth);
    return (
        <header className="navbar bg-base-100 shadow-md justify-between">
            <div className="">
                <a className="btn btn-ghost text-xl">Calculate Daily</a>
            </div>
            <ul className="">
                {
                    currentUser ?
                        (
                            <div tabIndex={0} role="button" className="btn btn-ghost">
                                <Link to="/profile">
                                    {userDetails ?
                                        <UserCircleIcon className='w-10 h-10' />
                                        : <p>Please complete your profile</p>
                                    }
                                </Link>
                            </div>
                        ) : (
                            <button className='btn btn-info'>Log in</button>
                        )
                }
            </ul>
        </header>
    )
}

export default Navbar