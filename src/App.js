import React, { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
  });
  const [sortBy, setSortBy] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...formData, id: Date.now() }]);
    setFormData({ name: "", category: "", amount: "" });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="expense-tracker">
      <header>
        <h1>Expense Tracker</h1>
        <p>
          Start taking control of your finances and life, Record, categorize and
          analyse your spendings
        </p>
      </header>
      <section className="parent">
        <form className="expense-form" onSubmit={handleAddExpense}>
          <h2>Add Expense</h2>
          <p>Enter your expense below</p>
          <input
            type="text"
            name="name"
            placeholder="Expense Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            min={0}
          />
          <button type="submit">Add Expense</button>
        </form>
        <div className="child">
          <div className="search">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select onChange={handleSortChange} value={sortBy}>
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </div>
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
                    <button onClick={() => handleDeleteExpense(expense.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;
