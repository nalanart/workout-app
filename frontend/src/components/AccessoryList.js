import './AccessoryList.css'

function AccessoryList({ session, accessoryList, addAccessory, accessories, editExercise }) {
  return (
    <div className="AccessoryList">
      <ul className="accessory-list">
        {accessoryList.map(accessory => (
          accessories.includes(accessory) ? null : 
          <li className="accessory-list-li" key={accessory._id}>
            {accessory[session].setsRegular}x{accessory[session].repsRegular} {accessory.name}
            <button onClick={() => addAccessory(accessory)}>Add</button>
            <button onClick={() => editExercise(accessory)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AccessoryList