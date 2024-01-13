import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile from "../../assets/Profile.jpg";
import { logout } from '../../services/store/slices/authSlice';
import ProfileForm from "./ProfileForm";

function Profile() {
    const dispatch = useDispatch();
    const { currentUser, userDetails } = useSelector((state) => state.auth);
    const { expenses} = useSelector((state) => state.expense);
    const [editMode, setEditMode] = useState(false);
    const Navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        Navigate("/login");
    }

    function changeMode() {
        setEditMode(prev => !prev);
    }

    function handleDownloadExpense() {
        const csvContent ="Category-->Description-->Amount\n" + 
            expenses.map(expense =>
                `${expense.category}-->${expense.description}-->${expense.amount}` 
            ).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "expenses.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <div className="card bg-base-100 shadow-xl max-w-[45rem] mx-auto p-6 min-h-[23rem] flex-row">
            <figure className='avatar w-[20rem] flex-col'>
                <div className='w-24 rounded-full' >
                    <img src={profile} alt="profile" />
                </div>
                {userDetails?.premium && <p className='font-bold text-red-600'>Premium Member</p>}
            </figure>
            <div className="card-body p-2 flex-row w-full ">
                {
                    editMode ?
                        (<ProfileForm changeMode={changeMode} />)
                        :
                        (<div className="w-full h-full *:mb-4">
                            Email: <p>{currentUser?.email}</p>
                            Email verify status: <p>{currentUser?.isEmailVerified ? "Yes" : "No"}</p>
                            UserName: <p>{userDetails?.userName}</p>
                            Degisnation: <p>{userDetails?.designation}</p>
                            <button type='button' className="btn btn-success w-28" onClick={changeMode}>Edit</button>
                        </div>)
                }
                <div className="card-actions justify-start items-end flex-col">
                    {userDetails?.premium && <button className="btn btn-warning" onClick={handleDownloadExpense}>Download Expenses</button>}
                    <button className="btn btn-info" onClick={handleLogout}>Log out</button>

                </div>
            </div>
        </div>
    )
}

export default Profile