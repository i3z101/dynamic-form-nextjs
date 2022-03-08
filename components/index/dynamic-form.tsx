import { DynamicFormInterface, DynamicFormReducerInterface, ResponseInformationInterface} from "helpers/interfaces";
import React, { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Select, MenuItem, InputLabel, FormControl, FormGroup, TextField, Button, Grid} from '@material-ui/core';
import Image from "next/image";
import { Modal, Text } from "@nextui-org/react";
import CustomModal from "components/shared-components/modal";
import ValidationMessage from "components/shared-components/validation-message";
import { validateEmailOnChange, validateNumberOnChange, validateStringOnChange } from "helpers/validations";
import dynamicFormActions from "store/actions/dynamic-form-actions";

const DynamicForm: FC = () => {
    const dispatch = useDispatch();
    const dynamicFormReducer: DynamicFormReducerInterface = useSelector((state: any)=>state.dynamicForm);
    const [formFields, setFormFields] = useState<DynamicFormInterface[]>([]);
    const [isDataSending, setIsDataSending] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [responseInformation, setResponseInformation] = useState<ResponseInformationInterface>({
        success: false,
        message:'',
        data: null
    });

    useEffect(()=> {
        setFormFields((prevState)=>prevState.concat(dynamicFormReducer.dynamicForm.map((item)=>{
            return {
                ...item,
                /** formattedFieldName idea:
                * 1- Convert the first letter into capital letter.
                * 2- Split the filed name into two parts dynamically if it is possible Ex. firstName => First Name
                */
                formattedFieldName: item.fieldName[0].toUpperCase()+item.fieldName.slice(1).replace(/[A-Z]/, ` ${item.fieldName[item.fieldName.search(/[A-Z]/)]}`),
                validation: ''
            }
        })));
    }, [])

    const onChangeFieldHandler = (e: ChangeEvent, itemIndex: number): void => {
        const formCopy = [...formFields];
        const target = e.target as HTMLInputElement;
        formCopy[itemIndex].value = target.value;
        switch(formCopy[itemIndex].type) {
            case "text":
                validateStringOnChange(target.value, formCopy[itemIndex].formattedFieldName, formCopy[itemIndex], true, 3, 100, true, false, false);
                break;
            case "number":
                validateNumberOnChange(target.value, formCopy[itemIndex].formattedFieldName, formCopy[itemIndex], true, 1);
                break;
            case "multiline":
                validateStringOnChange(target.value, formCopy[itemIndex].formattedFieldName, formCopy[itemIndex], true, 3, 500, true, true, false);
                break;
            case "email":
                validateEmailOnChange(target.value, formCopy[itemIndex].formattedFieldName, formCopy[itemIndex], true);
                break;
        }
        setFormFields(formCopy);
    }

    const submitHandler = async (): Promise<any> => {
        setIsDataSending(!isDataSending);
        let requestBody: any = {};
        formFields.forEach(element => {
            requestBody[element.fieldName] = element.value
        });
        try {
            const data = await fetch(`${process.env.BACKEND_URL}/form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            const response = await data.json();
            setResponseInformation(response);
            setIsDataSending(false);
            setShowModal(true);
            dispatch(dynamicFormActions.updateDynamicFormData(formFields));
            //In case the user did not close the modal, it will be closed automatically after 6 seconds
            setTimeout(() => {
                setIsDataSending(false);
                setShowModal(false);
            }, 6000);
        }catch(err: any) {
           window.alert(err.message);
        }
    }

    return <section className="dynamic_form_section_container">
            <Grid container spacing={2} className="dynamic_form_grid_container">
                <Grid item xs={12} md={5} lg={5} className="margin_center">
                    <div className="dynamic_form_image_container">
                        <Image src={"/work.svg"} width={700} height={700} alt="someone working image"/>
                    </div>
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                    <h1 className="form_text_container">
                        <span className="form_text">Let us know more </span>
                        😄
                    </h1>
                    <FormGroup className="dynamic_form_group">
                        {formFields.map((item, idx)=> {
                            return <FormControl key={idx} style={{marginBottom:'2rem'}}>
                                {item.type == "select" ?
                                    <Fragment>
                                        <InputLabel id={item.fieldName}>{item.formattedFieldName}</InputLabel> 
                                        <Select disabled={isDataSending} value={item.value} name={item.fieldName} id={item.fieldName} onChange={(e:ChangeEvent<any>)=>onChangeFieldHandler(e, idx)}>
                                            {item.options?.map((value, idx)=> {
                                                return <MenuItem value={value} key={idx}>{value}</MenuItem>
                                            })}
                                        </Select>
                                        <ValidationMessage message={item.validation}/>
                                    </Fragment>
                                : item.type == "multiline" ? 
                                <Fragment>
                                    <TextField
                                        disabled={isDataSending}
                                        id={item.fieldName}
                                        label={item.formattedFieldName}
                                        multiline
                                        rows={6}
                                        value={item.value}
                                        onChange={(e: ChangeEvent)=>onChangeFieldHandler(e, idx)}
                                        variant='outlined'
                                    />
                                    <ValidationMessage message={item.validation}/>
                                </Fragment>
                                
                                : <Fragment>
                                    <TextField id={item.fieldName} disabled={isDataSending} label={item.formattedFieldName} 
                                        variant="outlined"  name={item.fieldName} type={item.type} value={item.value} onChange={(e: ChangeEvent)=>onChangeFieldHandler(e, idx)} />
                                    <ValidationMessage message={item.validation}/>
                                </Fragment>
                                }   
                            </FormControl>
                        })}
                            <Button variant="contained" className="dynamic_form_send_btn_container" disabled={isDataSending || formFields.filter((item)=>item.validation.trim() != "").length > 0 ? true : false} 
                            onClick={()=>submitHandler()}
                            style={{backgroundColor: isDataSending || formFields.filter((item)=>item.validation.trim() != "").length > 0 ? "#ccc" : "#5463FF", color: "white"}}>
                                {isDataSending ? "Sending..." : "Send"}
                            </Button>
                        </FormGroup>
                    </Grid>
            </Grid>
            <CustomModal openModal={showModal} headerText={responseInformation.message} hasBody modalBody={JSON.stringify(responseInformation)} />
    </section>
}


export default DynamicForm