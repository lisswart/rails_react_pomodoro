import { useState, useEffect } from 'react'

function Labels() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((labelsArr) => {
        console.log(labelsArr);
        setLabels(labelsArr);
      })
  }, []);

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "left"}}>
      <div style={{display: "flex"}}>
        {/* Categories: */}
        <button>Add Label</button>
      </div>
      <table className="table labels">
        <tbody>
          <tr>
            <th></th>
            <th>Label</th>
            <th>Active</th>
          </tr>
          {
            labels && labels.map(label => (
              <tr key={label.id} >
                <td><button>delete</button></td>
                <td className="cell-width">
                  {label.category_label}
                </td>
                <td><input type="checkbox" /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Labels
