import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setExpenseData } from '../../services/store/slices/expenseSlice';
import { alertHandler } from '../../services/store/slices/authSlice';

function ExpenseForm() {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const catRef = useRef();
    const dispatch = useDispatch();
    const {loading } = useSelector(state => state.expense);

    async function addExpenseHandler(e) {
        e.preventDefault();
        const amount = amountRef.current.value,
            description = descriptionRef.current.value,
            category = catRef.current.value

            if(!amount|| !description){
                dispatch(alertHandler({show:true, msg:"Fill required fills"}));
                return;
            }
        const expenseData = {
            id: String(Date.now()),
            amount,
            description,
            category,
        }
        await dispatch(setExpenseData(expenseData));
        e.target.reset();
    }

    return (
        <div className='card max-w-[30rem] w-full shadow-md bg-base-100 mx-auto'>
            <div className="card-body w-full items-center">
                {loading && <span className="loading loading-dots loading-lg"></span>}
                <h2 className='card-title mb-6 text-2xl'>Add Expense</h2>
                <form onSubmit={addExpenseHandler} className='w-full'>
                    <div className="w-full card-actions gap-6">
                        <input type="text" placeholder="description" className="input input-bordered w-full" ref={descriptionRef} />
                        <input type="number" placeholder="Amount" className="input input-bordered w-full" ref={amountRef} />
                        <select className="select select-bordered w-full" ref={catRef}>
                            <option disabled defaultValue={"Rent"}>Select Category</option>
                            <option value="Rent">Rent</option>
                            <option value="Fuel">Fuel</option>
                            <option value="Snacks">Food</option>
                        </select>

                        <button type="submit" className='btn btn-info btn-block text-base'>Add Expense</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExpenseForm