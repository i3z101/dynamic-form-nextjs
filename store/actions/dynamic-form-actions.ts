import { DynamicFormInterface } from "helpers/interfaces";
import { AnyAction } from "redux";

export const ADD_ALL_DYNAMIC_FORM_DATA = "ADD_ALL_DYNAMIC_FORM_DATA";
export const UPDATE_DYNAMIC_FORM_DATA = "UPDATE_DYNAMIC_FORM_DATA";

export default {
    addAllDynaicFormData: (data: DynamicFormInterface[]): AnyAction => {
        return {
            type: ADD_ALL_DYNAMIC_FORM_DATA,
            data
        }
    },
    updateDynamicFormData: (updatedData: DynamicFormInterface[]): AnyAction => {
        return {
            type: UPDATE_DYNAMIC_FORM_DATA,
            updatedData
        }
    }
}