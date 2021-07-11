import React, { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';

function App() {

  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default App;
