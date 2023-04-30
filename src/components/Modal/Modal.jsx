import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, OverlayStyled } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

const Modal = (props) => {

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                props.onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [props])

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            props.onClose();
        }
    }

    return createPortal(
        <OverlayStyled onClick={handleBackdropClick}>
            <ModalStyled>
                <img src={props.largeImg} alt="" />
            </ModalStyled>
        </OverlayStyled>,
        modalRoot,
    );
}

Modal.propTypes = {
    largeImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;