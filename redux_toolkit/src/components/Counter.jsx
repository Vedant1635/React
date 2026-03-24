import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from '../redux/slices/counterSlice'

const Counter = () => {
    const [amount, setamount] = useState(0)
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(increment())
    }
    const handleDecrement = () => {
        dispatch(decrement())
    }
    const handleReset = () => {
        dispatch(reset())
    }
    const handleIncAmount = () => {
        dispatch(incrementByAmount(amount))
    }
    return (
        <div>
            <p>Count: {count}</p>
            <br />
            <button onClick={handleIncrement}>Increment</button>
            <br /><br />
            <button onClick={handleDecrement}>Decrement</button>
            <br /><br />
            <button onClick={handleReset}>Reset</button>
            <br /><br />
            <input type="number" value={amount} onChange={(e) => setamount(Number(e.target.value))} />
            <br /><br />
            <button onClick={handleIncAmount}>Increment By Amount</button>
        </div>
    )
}

export default Counter