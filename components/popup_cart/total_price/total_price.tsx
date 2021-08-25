import { useContext, useEffect, useState } from "react";
import { CustomContextApp } from "../../../bloc/custom_context_app";
import { Decimal } from "decimal.js-light";

import Style from "./total_price.module.sass";

export default function TotalPrice() {

    const {
        totalPriceState,
        setTotalPrice
    } = useContext(CustomContextApp);

    const initValue = +(new Decimal(totalPriceState.value))

    const [value, setValue] = useState(initValue);

    useEffect(() => {
        setValue(
            +(new Decimal(+totalPriceState.value).toFixed(3))
        )
    }, [totalPriceState]);

    return (
        <div className={Style.total_price_container}>

            <div className={Style.total_price_container__total_title}>
                total
            </div>

            <div className={Style.total_price_container__total_value}>
                {/* $5.396 */}
                {+value.toFixed(3)}
            </div>

        </div>
    )
}