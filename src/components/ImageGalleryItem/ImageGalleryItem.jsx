import PropTypes from 'prop-types';
import { ImageGalleryItemImageStyled, ImageGalleryItemStyled } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ pics, alt, onImageClicked }) => {
    return (  
        pics.map(({id, webformatURL, largeImageURL }) => (<ImageGalleryItemStyled key={id} onClick={() => (onImageClicked(largeImageURL))} >
            <ImageGalleryItemImageStyled src={webformatURL} alt={"a picture of " + alt} />
        </ImageGalleryItemStyled >))
        
    );
}

ImageGalleryItem.propTypes = {
    alt: PropTypes.string.isRequired,
    onImageClicked: PropTypes.func.isRequired,
    pics: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }))
}

export default ImageGalleryItem;