import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseCard from './ExpenseCard';
import { updateTotalExpense } from '../../services/store/slices/expenseSlice';

function ExpenseShow() {
  const { expenses ,loading} = useSelector(state => state.expense);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(updateTotalExpense());
  },[expenses])

  return (
    <div className="relative max-w-[77rem] min-h-[20rem] p-4 bg-base-100 mx-auto mt-10 shadow-xl rounded-lg flex items-start justify-center gap-4 flex-wrap">
      {loading && <span className="loading loading-dots loading-lg"></span>}
      {!loading && !expenses.length && <p className='text-2xl font-medium'>No expense available!</p>}
      {
        expenses?.map(expense => {
          return (
            <ExpenseCard expense = {expense} key={expense.id}/>
          )
        })
      }
    </div>
  )
}

export default ExpenseShow