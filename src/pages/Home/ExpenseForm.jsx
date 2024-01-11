import React, { useRef } from 'react'

function ExpenseForm() {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const catRef = useRef();

    function addExpenseHandler(e) {
        e.preventDefault();
        console.log(catRef.current.value);
    }

    return (
        <div className='card max-w-[30rem] w-full shadow-md bg-base-100 mx-auto'>
            <div className="card-body w-full items-center">
                <h2 className='card-title mb-6 text-2xl'>Add Expense</h2>
                <form onSubmit={addExpenseHandler} className='w-full'>
                    <div className="w-full card-actions gap-6">
                        <input type="number" placeholder="Amount" className="input input-bordered w-full" ref={amountRef} />
                        <input type="text" placeholder="description" className="input input-bordered w-full" ref={descriptionRef} />
                        <select className="select select-bordered w-full" ref={catRef}>
                            <option disabled defaultValue={"Select Category"}>Select Category</option>
                            <option value="Rent">Rent</option>
                            <option value="Fuel">Fuel</option>
                            <option value="Snacks">Snacks</option>
                        </select>

                        <button type="submit" className='btn btn-info btn-block text-base'>Add Expense</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExpenseForm