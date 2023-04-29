import PropTypes from 'prop-types';

import { ButtonStyled } from "./Button.styled";

const Button = ({ label, onClick }) => {
    return <ButtonStyled type="button" onClick={onClick}>{label}</ButtonStyled>;
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Button;