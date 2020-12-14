import './Home.css'

export default function Home() {
  return (
    <div className="Home-container">
      <h2>Welcome to my workout app!</h2>
      <p>This app is modelled after the PPL (push, pull, legs) program which separates your workouts into 3 different types based on their motions.</p>
      <ul>
        <li>Push: These exercises are ones that you move away from your body e.g. a bench press</li>
        <li>Pull: These exercises are ones that you move towards your body e.g. a row</li>
        <li>Legs: Any exercise related to lower-body</li>
      </ul>
      <p>It's a 6-day schedule that is goes like this: Push, Pull, Legs, Rest, Push, Pull, Legs, abbreviated as PPLRPPL.</p>
      <h3>Nomenclature</h3>
      <p>All exercises will be described with the following format: <b>n</b>x<b>m</b> @ <b>m</b> lbs</p>
      <p>where <b>n</b> is the number of sets, <b>m</b> is the number of reps, and <b>m</b> is the weight</p>
      <p>For example: <i>4x5 @ 50 lbs</i> would read as '4 sets of 5 reps at 50 pounds'.</p>
      <p>Sometimes, you'll see something such as <i>1x5+ @ 50 lbs</i>. This is what's known as an AMRAP set, meaning As Many As Possible. So it would read as '1 set of <i>at least</i> 5.</p>
      <h3>Linear Progression</h3>
      <p>This program is also a linear progression one.</p>
      <p>It means that if you were to graph the weights used in your exercises over time, it would look like a straight line that is always increasing.</p>
      <p>In short, you would have to increase the weight used in your exercise the next time you do it. Here is a general rule to follow for adding weight:</p>
      <ul>
        <li>5 lbs for upper body lifts (bench press, row, overhead press)</li>
        <li>5 lbs for squats</li>
        <li>5 lbs for all accessories</li>
        <li>10 lbs for deadlifts</li>
      </ul>
    </div>
  )
}
