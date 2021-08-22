import Categories from '../../categories/categories';
import Style from "./second_container.module.sass";
export default function SecondContainer() {

    return (

        <div className={Style.container}>
            <Categories></Categories>
        </div>
    );
}