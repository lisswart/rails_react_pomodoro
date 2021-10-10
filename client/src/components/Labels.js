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
    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left", backgroundColor: "rgb(78,78,78,0.1)", paddingTop: "1rem"}}>
      <button style={{marginLeft: "3rem"}}>Add Label</button>
      <table className="table">
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
