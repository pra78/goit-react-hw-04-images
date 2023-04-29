import PropTypes from 'prop-types';
import { ImageGalleryStyled } from "./ImageGallery.styled";

const ImageGallery = ({ children }) => {
    return (
        <ImageGalleryStyled>
            {children}
        </ImageGalleryStyled>
    );
}

ImageGallery.propTypes = {
    children: PropTypes.any.isRequired,
}

export default ImageGallery;