import { useState } from 'react';

function AddCategoryForm({ user, setCategory, setCategoryID }) {
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

  function populateCategoriesList() {
    const categoriesSet = new Set();
    (user.categories).forEach(category => categoriesSet.add(category.category_label.toLowerCase().trim()));
    return categoriesSet;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="categoryLabel" />
      <input list="category-list" 
        onChange={e => setCategoryLabel(e.target.value)}
        id="category_label"
        value={categoryLabel}
        placeholder="Please a choose a category AND PRESS ENTER..."
        className="task-input"
      />
      <datalist id="category-list">
        {
          user.categories
          ? Array.from(populateCategoriesList()).map((category, i) => (
              <option key={i}
                value={category}
                onChange={e => setCategoryLabel(e.target.value)}
              />
            ))
          : <></>
        }
      </datalist>
    </form>
  );
}

export default AddCategoryForm;
