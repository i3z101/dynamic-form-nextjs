export interface DynamicFormInterface {
    fieldName: string,
    type: string,
    value: string,
    options?: string[]|number[],
    formattedFieldName: string,
    validation: string
}


export interface DynamicFormReducerInterface {
    dynamicForm: DynamicFormInterface[]
}

export interface CustomModalInterface {
    openModal: boolean,
    headerText: string,
    hasBody?: boolean,
    modalBody?: any,
    hasFooter?: boolean,
    modalFooter?: any
}

export interface ValidationMessageInterface {
    message: string
}

export interface ResponseInformationInterface {
    message: string,
    success: boolean,
    data: any
}