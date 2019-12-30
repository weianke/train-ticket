import React, { Component, PureComponent ,useState, useEffect, createContext, useContext, useRef, useMemo,  memo, useCallback} from 'react'
import logo from './logo.svg'
import './App.css'


const CountContext = createContext();


//  const Counter = memo(function Counter(props) {
//    console.log('Counter  render!!!')
//   return (
//     <h1 onClick={props.onClickCounter}>{props.count}</h1>
//   )
// })

class Counter extends PureComponent {
  speak () {
    console.log(`now counter is ${this.props.count}`)
  }
  render() {
    const {props} = this;
    return (
       <h1 onClick={props.onClickCounter}>{props.count}</h1>
    )
  }
}

function App(props) {
  const timer = useRef();
  const addRef = useRef(null)
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0
  })
  const [name, setName] = useState('anke')
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  const [clickCount, setClickCount] = useState(0)
  const countRef = useRef();

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
    timer.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(timer.current)
    }
  })

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

  const inputValue = () => {
      console.log(addRef.current.value);
  }

  const double = useMemo(() => {
    return count * 2
  }, [ count === 3])

  // 子组件传递的世间
  const onClickC = useCallback(() => {
    console.log('click')
    setClickCount(setClickCount => clickCount + 1)
    countRef.current.speak();
  }, [countRef])

  return (
    <div>
      <buton
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click ({count}), {name}, double: {double}
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
      <CountContext.Provider value={count}>
        <Counter count={double} onClickCounter={onClickC} ref={countRef}></Counter>
      </CountContext.Provider>

      <input type="text" ref={addRef} />
      <button
        type="button"
        onClick={() => {
          inputValue()
        }}
      >
        获取input值
      </button>
    </div>
  )
}

export default App
