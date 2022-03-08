import { Reducer } from "react";
import { AnyAction } from "redux";
import { ADD_ALL_DYNAMIC_FORM_DATA, UPDATE_DYNAMIC_FORM_DATA } from "store/actions/dynamic-form-actions";
import {DynamicFormReducerInterface } from "../../helpers/interfaces";

const initState: DynamicFormReducerInterface = {
    dynamicForm: []
}


const dynamicFormReducer: Reducer<DynamicFormReducerInterface, AnyAction> = (state= initState, action): DynamicFormReducerInterface => {
    switch(action.type) {
        case ADD_ALL_DYNAMIC_FORM_DATA:
            return {
                ...state,
                dynamicForm: action.data
            }
        case UPDATE_DYNAMIC_FORM_DATA:
            return {
                ...state,
                dynamicForm: action.updatedData
            }
        default:
            return state
    }
}


export default dynamicFormReducer