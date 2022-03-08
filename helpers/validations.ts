import { DynamicFormInterface } from "./interfaces";

export const validateStringOnChange = (value: string, name: string, form: DynamicFormInterface, isRequired: boolean, min: number, max: number, containSpace:boolean, containNumeric: boolean, containSymbolsCharacters: boolean, symbol?:string): void => {
    let message:string = "";
    if(isRequired){
        if(value.trim() == ""){
            message = `${name} required`;
        }else if(containSpace && containNumeric && containSymbolsCharacters) {
            if(!value.trim().match(`([^*&^%$#@!~+-=?؟])([A-Za-z\s0-9${symbol}])+$`)){
                message = `${name} should contain english characters or numbers or ${symbol}`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }else if(containSpace && !containNumeric && containSymbolsCharacters) {
            if(!value.trim().match(`[A-Za-z\s${symbol}]+$`)){
                message = `${name} should contain english character or ${symbol}`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }else if(containSpace && !containNumeric && !containSymbolsCharacters){
            if(!value.trim().match(`[A-Za-z\s]+$`)){
                message = `${name} should contain only english character`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }    
        }else if(containSpace && containNumeric && !containSymbolsCharacters) {
            if(!value.trim().match(`[A-Za-z\s0-9]+$`)){
                message = `${name} should contain english character or numbers`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }else if(!containSpace && !containNumeric && !containSymbolsCharacters) {
            if(!value.trim().match(`[A-Za-z]+$`)){
                message = `${name} should contain english character without spaces`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }else if(!containSpace && containNumeric && !containSymbolsCharacters) {
            if(!value.trim().match(`[A-Za-z]+$`)){
                message = `${name} should contain english character or numbers without spaces`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }
    }else {
        if(containSpace && containNumeric && containSymbolsCharacters) {        
            if(!value.match(`[A-Za-z\s0-9${symbol}]+$`)){
                message = `${name} should contain english characters or numbers or ${symbol}`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }else if(containSpace && !containNumeric && containSymbolsCharacters) {
            if(!value.match(`[A-Za-z\s${symbol}]+$`)){
                message = `${name} should contain english character or ${symbol}`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }else if(containSpace && !containNumeric && !containSymbolsCharacters){
            if(!value.trim().match(`[A-Za-z\s]+$`)){
                message = `${name} should contain only english character`;
            }else if(value.length < min || value.length > max){
                message = `${name} should contain english character or ${symbol}`;
            }else {
                message = "";
            }
        }else if(containSpace && containNumeric && !containSymbolsCharacters) {
            if(!value.trim().match(`[A-Za-z\s0-9]+$`)){
                message = `${name} should contain english character or numbers`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }else if(!containSpace && !containNumeric && !containSymbolsCharacters) {
            if(!value.trim().match(`[A-Za-z]+$`)){
                message = `${name} should contain english character without spaces`;
            }else if(value.length < min || value.length > max){
                message = `${name} should contain only english character`;
            }else {
                message = "";
            }
        }else if(!containSpace && containNumeric && !containSymbolsCharacters) {
            if(!value.trim().match(`[A-Za-z]+$`)){
                message = `${name} should contain english character or numbers without spaces`;
            }else if(value.length < min || value.length > max){
                message = `${name} should be between ${min} and ${max}`;
            }else {
                message = "";
            }
        }
    }
    form.validation = message;
    return;
}

export const validateNumberOnChange = (value: string, name: string, form: DynamicFormInterface, isRequired: boolean, min: number): void => {
    let message: string = "";
    if(isRequired) {
        if(value.trim() == ""){
            message = `${name} is required`
        }else if(!value.trim().match(/[0-9]/)){
            message = `${name} must contain numbers only`
        }else if(Number(value) < min){
            message = `${name} must be greater or equal ${min}`
        }
    }else {
        if(!value.trim().match(/[0-9]/)){
            message = `${name} must contain numbers only`
        }else if(Number(value) < min){
            message = `${name} must be greater or equal ${min}`
        }
    }
    
    form.validation = message
}

export const validateEmailOnChange = (value: string, name: string, form: DynamicFormInterface, isRequired: boolean): void => {
    let message: string = "";
    if(isRequired) {
        if(value.trim()=="") {
            message = `${name} is required`
        }else if(!value.trim().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) {
              message = `${name} is not valid`
          }
    }else {
       if(!value.trim().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) {
              message = `${name} is not vaid`
          }
    }

    form.validation = message;
}