import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        } else {
            alert("Cannot decrement below 0");
        }
    };

    const reset = () => {
        setCount(0);
    };

  return (
    <div className="App">
        
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
          
        </div>

  );
}

export default App;