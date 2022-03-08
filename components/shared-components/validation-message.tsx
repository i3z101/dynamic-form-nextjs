import { ValidationMessageInterface } from "helpers/interfaces";
import React, { FC } from "react";

const ValidationMessage: FC<ValidationMessageInterface> = ({message}) => {
    return <span className="validation_message">{message}</span>
}

export default ValidationMessage