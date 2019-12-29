import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App(props) {
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0
  })
  const [name, setName] = useState('anke')
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  useEffect(() => {
    setName('ankeF' + count)
    document.title = count
  }, [count])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  const onClick = () => {
    console.log('click');
  }

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick)
    return () => {
       document.querySelector('#size').removeEventListener('click', onClick)
    }
  })

  return (
    <div>
      <buton
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click ({count}), {name}
      </buton>
      {count % 2 ? (
        <span id="size">
          size {size.width},{size.height}
        </span>
      ) : (
        <p id="size">
          size {size.width},{size.height}
        </p>
      )}
    </div>
  )
}

export default App
