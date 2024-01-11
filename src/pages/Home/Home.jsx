import React from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseShow from './ExpenseShow'

function Home() {
  return (
    <div>
      <ExpenseForm/>
      <ExpenseShow/>
    </div>
  )
}

export default Home