import { useState } from 'react';

function AddCategoryForm({ setCategory, setCategoryID }) {
  const [categoryLabel, setCategoryLabel] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/categories', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({categoryLabel})
    }).then((r) => r.json())
      .then((category) => {
        console.log(category);
        setCategory(category.category_label);
        setCategoryID(category.id);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="categoryLabel" />
      <input type="text" 
        onChange={e => setCategoryLabel(e.target.value)}
        id="category_label"
        value={categoryLabel}
        placeholder="Please a choose a category AND PRESS ENTER..."
        className="task-input"
      />
    </form>
  );
}

export default AddCategoryForm;
