import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertHandler } from '../../services/store/slices/authSlice';
import { addExpense, deletExpenseData, deleteExpense, setExpenseData, updateTotalExpense } from '../../services/store/slices/expenseSlice';

function ExpenseCard({ expense }) {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const catRef = useRef();
    const descriptionRef = useRef();
    const amountRef = useRef();


    async function handleDeleteExpense(expenseId) {
        dispatch(deleteExpense(expenseId));
        await dispatch(deletExpenseData(expenseId));
        dispatch(updateTotalExpense());
        dispatch(alertHandler({ show: true, msg: "Delete successfully" }));
    }

    async function editDoneHandler(expenseId){
        const amount = amountRef.current.value,
            description = descriptionRef.current.value,
            category = catRef.current.value

            if(!amount|| !description || !category){
                dispatch(alertHandler({show:true, msg:"Fill required fills"}));
                return;
            }
        const expenseData = {
            id: expenseId,
            amount,
            description,
            category,
        }
        dispatch(addExpense(expenseData));
        await dispatch(setExpenseData(expenseData));
        dispatch(updateTotalExpense());
        changeMode();
    }

    function changeMode(){
        setEditMode(prev => !prev);
    }

    return (
        <div className="card w-72 bg-info shadow-xl" >
            {
                !editMode ?
                    (
                        <div className="card-body">
                            <h2 className="card-title">{expense.category}</h2>
                            <p>{expense.description}</p>
                            <p className='font-bold'>Expense Amount: {expense.amount}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-error" onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                                <button className="btn btn-success" onClick={changeMode}>Edit</button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="card-body">
                            <input
                                type="text"
                                className="input input-sm input-bordered block mb-3"
                                defaultValue={expense.category}
                                ref={catRef}
                            />
                            <input
                                type="text"
                                className="input input-sm input-bordered block mb-3"
                                defaultValue={expense.description}
                                ref ={descriptionRef}
                            />
                            <input
                                type="text"
                                className="input input-sm input-bordered block mb-3"
                                defaultValue={expense.amount}
                                ref={amountRef}
                            />
                            <div className="card-actions justify-end">
                                <button className="btn btn-success" 
                                onClick={()=>editDoneHandler(expense.id)}>Done</button>
                            </div>
                        </div>
                    )
            }


        </div>
    )
}

export default ExpenseCard