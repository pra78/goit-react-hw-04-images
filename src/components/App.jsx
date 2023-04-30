import { useEffect, useState } from "react";
import { SearchBar, ImageGallery, ImageGalleryItem, Button, Loader, Modal } from "components";
import { AppStyled } from './App.styled';
import fetchImages from "api/Api";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [picsShown, setPicsShown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function loadPics() {
      setIsLoading(true);
      const response = await fetchImages(searchQuery, page);
      const newPicturesArray = response.hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL, }));
      setPhotos((prevPhotos) => [...prevPhotos, ...newPicturesArray]);
      setIsLoading(false);
      setPicsShown((prevCount) => prevCount + response.hits.length);
      setTotalHits(response.totalHits);
    }
    loadPics();
  }, [searchQuery, page]);

  useEffect(() => {
    setShowLoadMoreBtn(picsShown < totalHits);
  }, [picsShown, totalHits])

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(encodeURI(event.currentTarget.searchQuery.value));
    setPage(1);
    setPhotos([]);
    setPicsShown(0);
    setTotalHits(0);
    setShowLoadMoreBtn(false);
  }

  const handleLoadMoreBtnClick = () => {
    setPage((prevPage) => prevPage + 1);
  }

  const handlePictureClick = (largeImageURL) => {
    toggleModal();
    setSelectedImage(largeImageURL);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <AppStyled>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery >
        <ImageGalleryItem pics={photos} alt={searchQuery} onImageClicked={handlePictureClick} />
      </ImageGallery>
      {isLoading && <Loader />}
      {showLoadMoreBtn && <Button label="Load more" onClick={handleLoadMoreBtnClick} />}
      {showModal && <Modal onClose={toggleModal} largeImg={selectedImage} />}
    </AppStyled>
  );
}

export default App;