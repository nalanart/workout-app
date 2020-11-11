// import Exercise from './Exercise'
import './ExerciseList.css'

function AccessoryList({ accessoryList, onClick }) {

  const handleClick = ({ target }) => {
    const accessory = target.value
    onClick(accessory)
  }

  return (
    <div>
      {accessoryList.map((accessory, index) => (
        <button value={accessory.name} onClick={handleClick} key={accessory._id}>
          {accessory.name}
        </button>
      ))}
    </div>
  )
}

export default AccessoryList