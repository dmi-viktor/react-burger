import React from 'react';
import style from './ingredient-details.module.css';
import IngredientValueDetails from '../ingredient-value-details/ingredient-value-details';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

export default function IngredientDetails() {
    const allIngredients = useSelector(state => state.ingredients.items);
    const [details, setDetails] = React.useState<TIngredient | null | undefined>(null);
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        let details = (allIngredients as TIngredient[]).find((item: TIngredient) => item._id === id);
        setDetails(details);
    }, [allIngredients]);

    return (
    <>
        {
            details &&
            <div className={style.mainModal}>
                <div className={`${style.modalTitle} title-details`}>
                    <span className="text text_type_main-large" data-cy="modal_title">Детали ингредиента</span>
                </div>
                <div className={style.modalContent}>
                    <img src={details.image_large} className="pb-4" />
                    <span className="text text_type_main-medium pb-8" data-cy="ingredient_name">
                        {details.name}
                    </span>
                    <div className={`${style.energyValueList} pb-5`}>
                        <IngredientValueDetails title="Калории,ккал" energyValue={details.calories} dataCy="calories" />
                        <IngredientValueDetails title="Белки,г" energyValue={details.proteins} dataCy="proteins" />
                        <IngredientValueDetails title="Жиры,г" energyValue={details.fat} dataCy="fat" />
                        <IngredientValueDetails title="Углеводы,г" energyValue={details.carbohydrates} dataCy="carbohydrates" />
                    </div>
                </div>
            </div>
            }
        </>
    );
}