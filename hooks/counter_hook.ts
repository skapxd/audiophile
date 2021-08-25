import { useState } from 'react';

export default function useCounter(initialValue = 0) {
    const [counterState, setState] = useState(initialValue);

    const counterIncrement = () => {
        setState(counterState + 1);
    }

    const counterDecrement = () => {
        if (counterState > 0) {
            setState(counterState - 1);
        }
    }

    const counterReset = () => {
        setState(0)
    }

    return {
        counterState,
        counterIncrement,
        counterDecrement,
        counterReset
    }

}