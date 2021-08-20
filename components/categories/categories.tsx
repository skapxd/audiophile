import Style from './categories.module.sass'
import Category from './category';

export default function Categories() {
    return (

        <div className={Style.container}>

            < div className={Style.list_categories}>
                <Category
                    name='headphones'
                    image='/categories/headphones.png'
                    link=''
                />

                <Category
                    name='speakers'
                    image='/categories/speakers.png'
                    link=''
                />


                <Category
                    name='earphones'
                    image='/categories/earphones.png'
                    link=''
                />
            </div>
        </div>
    )
}