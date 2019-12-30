import React, {
  Component,
  PureComponent,
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useRef,
  useMemo,
  memo
} from 'react'
import logo from './logo.svg'
import './App.css'

const CountContext = createContext()

function useCounter(count) {
  const size = useSize()
  return (
    <h1>
      {count}, {size.width}-{size.height}
    </h1>
  )
}

function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)

  useEffect(() => {
    document.title = count
  }, [count])

  return [count, setCount]
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return size
}

function App(props) {
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()

  return (
    <div>
      <buton
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click ({count}), size: {size.width}, height: {size.height}
      </buton>
      {Counter}
    </div>
  )
}

export default App
