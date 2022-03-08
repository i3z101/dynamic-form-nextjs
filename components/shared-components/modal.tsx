import { Modal, Text } from "@nextui-org/react";
import { CustomModalInterface } from "helpers/interfaces";
import React, { FC } from "react";

const CustomModal: FC<CustomModalInterface> = ({openModal, headerText, hasBody, modalBody, hasFooter, modalFooter}) => {
    return  <Modal
    closeButton
    blur
    aria-labelledby="modal-title"
    open={openModal}
    >
    <Modal.Header>
        <Text b size={18}>
            {headerText}
        </Text>
    </Modal.Header>
    {hasBody && 
    <Modal.Body>
        {modalBody}
    </Modal.Body>
    }
    {hasFooter && 
    <Modal.Footer>
        {modalFooter}
    </Modal.Footer>
    }
</Modal>
}


export default CustomModal