import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App(props) {
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0;
  });
  const [name, setName] = useState('anke')

  useEffect(() => {
     setName('ankeF' + count)
  }, [count])

  return (
    <buton 
      type="button"
      onClick={() => {
        setCount(count + 1)
      }}
    >
      Click ({count}), {name}
    </buton>
  )
}

export default App
