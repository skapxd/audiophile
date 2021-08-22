import Style from "./header_name_product.module.sass";

interface HeaderNameProductI {
    name: string

}
export default function HeaderNameProduct(data: HeaderNameProductI) {
    return (
        <div className={Style.container}>
            <h3 className={Style.name}>
                {data.name}
            </h3>
        </div>
    )
}