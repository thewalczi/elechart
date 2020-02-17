import React, { useContext } from 'react';
import { ChartDataContext } from '../../contexts/ChartData.context';

const Modal = () => {

    const {modalState, ToggleModalState} = useContext(ChartDataContext);

    return (
        modalState ? <div className="modal">
            <div className="modal-mask" onClick={() => ToggleModalState()}>
            </div>
            <div className="modal-container">
                <RemoveValueModal/>
            </div>
        </div>
        : null
    );
}

const RemoveValueModal = () => {

    const { RemoveData, ToggleModalState, currentItem } = useContext(ChartDataContext);

    const removeValueText = "Are you sure you want to remove this value?";
    
    return (
        <div className="modal-remove-value">
            <p>{removeValueText}</p>
            <div className="modal-button-box">
                <button className="button-secondary button-default modal-button-cancel" onClick={() => ToggleModalState()}>Cancel</button>
                <button className="button-primary button-default modal-button-remove" onClick={() => RemoveData(currentItem)}>Remove</button>
            </div>
        </div>
    )
}

export default Modal;