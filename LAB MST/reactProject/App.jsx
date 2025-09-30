import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Increment function
  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  // Decrement function
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // Reset function
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter: {count}</h2>

      <button onClick={handleDecrement} disabled={count === 0}>
        -
      </button>

      <button onClick={handleIncrement} disabled={count === 10}>
        +
      </button>

      <button onClick={handleReset}>Reset</button>

      {/* Show message only if count < 10 */}
      {count >= 10 && <p>Maximum Limit!</p>}
    </div>
  );
}

export default Counter;
