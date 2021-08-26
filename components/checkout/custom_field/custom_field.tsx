import Style from "./custom_field.module.sass";

interface CustomFieldI {
    name: string
    placeholder: string
    onChange: (value: string) => void
    disable?: boolean
    onClick?: () => void
    value?: string
}

export default function CustomField(data: CustomFieldI) {


    return (
        <div
            onClick={() => { data.onClick && data.onClick() }}
            className={Style.customFieldContainer}
        >
            <div className={Style.customFieldContainer_name}>
                {data.name}
            </div>

            <input
                type="text"
                className={Style.customFieldContainer_input}
                disabled={data.disable ?? false}

                id={data.name}
                name={data.name}
                value={data.value ?? ''}
                placeholder={data.placeholder}
                onChange={(e) => { data.onChange(e.target.value) }}

            />
        </div>
    )
}
