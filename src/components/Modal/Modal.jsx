import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, OverlayStyled } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }
    
    render() {
        return createPortal(
            <OverlayStyled onClick={this.handleBackdropClick}>
                <ModalStyled>
                    <img src={this.props.largeImg} alt="" />
                </ModalStyled>
            </OverlayStyled>,
            modalRoot,
        );
    }
}

Modal.propTypes = {
    largeImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;