import { useState } from 'react';

export default function useCounter(initialValue = 0) {
    const [counterState, setState] = useState(initialValue);

    const counterIncrement = (fn?: () => void) => {
        setState(counterState + 1);

        setTimeout(() => {

            if (fn) {
                fn()
            }
        }, 1000
        )
    }

    const counterDecrement = (fn?: () => void) => {
        if (counterState > 0) {
            setState(counterState - 1);

            setTimeout(() => {

                if (fn) {
                    fn()
                }
            }, 1000
            )
        }


    }

    const counterReset = (fn?: () => void) => {
        setState(0)

        setTimeout(() => {

            if (fn) {
                fn()
            }
        }, 1000
        )
    }

    return {
        counterState,
        counterIncrement,
        counterDecrement,
        counterReset
    }

}