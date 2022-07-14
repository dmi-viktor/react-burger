import React from 'react';
import style from './ingredient-details.module.css';
import IngredientValueDetails from '../ingredient-value-details/ingredient-value-details';
// @ts-ignore
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

export default function IngredientDetails() {
    // @ts-ignore
    const allIngredients = useSelector(state => state.ingredients.items);
    const [details, setDetails] = React.useState<TIngredient | null>(null);
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {        
        let details = allIngredients.find((item: TIngredient) => item._id === id);
        setDetails(details);
    }, [allIngredients]);

    return (
    <>
        {
            details &&
            <div className={style.mainModal}>
                <div className={`${style.modalTitle} title-details`}>
                    <span className="text text_type_main-large"> Детали ингредиента </span>
                </div>
                <div className={style.modalContent}>
                    <img src={details.image_large} className="pb-4" />
                    <span className="text text_type_main-medium pb-8">
                        {details.name}
                    </span>
                    <div className={`${style.energyValueList} pb-5`}>
                        <IngredientValueDetails title="Калории,ккал" energyValue={details.calories} />
                        <IngredientValueDetails title="Белки,г" energyValue={details.proteins} />
                        <IngredientValueDetails title="Жиры,г" energyValue={details.fat} />
                        <IngredientValueDetails title="Углеводы,г" energyValue={details.carbohydrates} />
                    </div>
                </div>
            </div>
            }
        </>
    );
}