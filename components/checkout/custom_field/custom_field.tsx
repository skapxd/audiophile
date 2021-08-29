import { InputHTMLAttributes, useState } from "react";
import Style from "./custom_field.module.sass";

interface CustomFieldI {
    name: string
    placeholder: string
    value?: string
    type: string
    pattern?: string
    autocomplete?: string
    onClick?: () => void
    onChange?: (value: string, isValid: boolean) => void

}

export default function CustomField(data: CustomFieldI) {

    let [isValid, setIsValid] = useState(true);

    return (
        <div
            onClick={(e) => {

                data.onClick && data.onClick()
            }}
            className={Style.customFieldContainer}
        >
            <div className={Style.customFieldContainer_name}>
                {data.name}
            </div>

            <input
                autoComplete={data.autocomplete}
                className={
                    isValid
                        ? Style.customFieldContainer_input
                        : Style.customFieldContainer_input_error
                }

                type={data.type}
                id={data.name}
                name={data.name}
                value={data.value ?? ''}
                placeholder={data.placeholder}
                onChange={(e) => {

                    const value = e.target.value

                    let valued = '';

                    if (data.pattern) {

                        valued = new RegExp(data.pattern).exec(value) ? new RegExp(data.pattern).exec(value)[0] : ''
                        if (value === valued) {
                            setIsValid(true);

                        } else {
                            setIsValid(false);
                        }
                    }


                    if (data.onChange) {
                        data.onChange(value, (value === valued))
                    }
                }}

            />
        </div>

    )
}
