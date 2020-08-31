import { v4 as uuid } from 'uuid';
import { DefaultState } from './DefaultState';

export const reducer = (state = DefaultState, action) => {

    const newState = {...state};

    switch (action.type) {
        case "ADD_DATA":
            console.log(state.data);
            return {
                ...state,
                data: state.data.concat(
                    {
                        name: action.name,
                        value: action.value,
                        id: uuid()
                    }
                )
            }
        break;

        case "REMOVE_DATA":
            return {
                ...state,
                data: state.data.filter(item => {
                    return item.id !== action.id;
                }),
                showRemovePrompt: false,
                idToProcess: ''
            }
        break;

        case "OPEN_MODAL":
            return {
                ...state,
                showRemovePrompt: true,
                idToProcess: action.id
            }
        break;

        default:
            return newState;
        break;
    }
}