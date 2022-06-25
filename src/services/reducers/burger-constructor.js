import {
    ADD_TO_CONSTRUCTOR,
    REMOVE_FROM_CONSTRUCTOR,
    REMOVE_ALL_FROM_CONSTRUCTOR,
    MOVE_IN_CONSTRUCTOR
} from '../actions/burger-constructor';

const initialState = {
    constructorItems: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CONSTRUCTOR: {
            return {
                ...state,
                constructorItems: [...state.constructorItems, action.ingredientData]
            };
        }
        case REMOVE_FROM_CONSTRUCTOR: {
            return {
                ...state,
                constructorItems: [...state.constructorItems].filter(item => item.uuid !== action.ingredientData.uuid)
            };
        }
        case REMOVE_ALL_FROM_CONSTRUCTOR: {
            return {
                ...state,
                constructorItems: [...state.constructorItems].filter(item => false)
            };
        }
        case MOVE_IN_CONSTRUCTOR: {
            let result = [...state.constructorItems].filter(item => item.type !== 'bun');

            let hoverIndex = action.hoverIndex;
            let dragIndex = action.dragIndex;            

            if (hoverIndex < dragIndex) {
                result.splice(hoverIndex, 2, result[dragIndex], result[hoverIndex]);
            } else {
                result.splice(dragIndex, 2, result[hoverIndex], result[dragIndex]);
            }

            result = result.concat([...state.constructorItems].filter(item => item.type === 'bun'));

            return {
                ...state,
                constructorItems: result
            };
        }
        default: {
            return state;
        }
    }
};