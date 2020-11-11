import './AccessoryList.css'

function AccessoryList({ accessoryList, addAccessory, accessories }) {

  return (
    <div>
      {accessoryList.map(accessory => (
        accessories.includes(accessory) ? null : <button value={accessory} onClick={() => addAccessory(accessory)} key={accessory._id}>
          {accessory.name}
        </button>
      ))}
    </div>
  )
}

export default AccessoryList