import './AccessoryList.css'

function AccessoryList({ accessoryList, addAccessory, accessories }) {
  return (
    <div className="AccessoryList">
      <ul className="accessory-list">
        {accessoryList.map(accessory => (
          accessories.includes(accessory) ? null : 
          <li className="accessory-list-li" key={accessory._id}>
            {accessory.name} 
            <button className="btn btn-info" onClick={() => addAccessory(accessory)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AccessoryList