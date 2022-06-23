import { useState } from 'react';

const Todo = (props) => {
  const [done, setDone] = useState(false);

  const handleChange = () => {
    console.log(`is changed...`);
    setDone(!done);
  }
  
  return (
    <div className="todo">
      <input id={props.id} name={props.id} type="checkbox" checked={isDone} onChange={handleChange} />
      <label htmlFor={props.id} style={{textDecoration: done ? 'line-through' : 'none'}}>{props.name}</label>
    </div>
  )
}

export default Todo;