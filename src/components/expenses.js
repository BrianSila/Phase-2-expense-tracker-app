import React from "react";

function Expenses({ onDelete, filteredExpenses }) {
  return (

    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredExpenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.name}</td>
            <td>{expense.category}</td>
            <td>Ksh {expense.amount}</td>
            <td>
              <button onClick={() => onDelete(expense.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Expenses;


// input form


        
// Search, Sort and table
