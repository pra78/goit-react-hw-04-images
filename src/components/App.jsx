import { Component } from "react";
import { SearchBar, ImageGallery, ImageGalleryItem, Button, Loader, Modal } from "components";
import { AppStyled } from './App.styled';
import fetchImages from "api/Api";

class App extends Component {

  state = {
    photos: [],
    searchQuery: "",
    page: 1,
    totalHits: 0,
    picsShown: 0,
    isLoading: false,
    showModal: false,
    selectedImage: "",
  };

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.loadPics();
    }
  }

  loadPics = async () => {
    this.setState({ isLoading: true, });
    const { searchQuery, page } = this.state;
    const response = await fetchImages(searchQuery, page);
    const newPicturesArray = response.hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL, }));
    this.setState((prevState) => ({ photos: [...prevState.photos, ...newPicturesArray], isLoading: false, picsShown: prevState.picsShown + response.hits.length, totalHits: response.totalHits, }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: encodeURI(event.currentTarget.searchQuery.value), page: 1, photos: [], picsShown: 0, totalHits: 0 });
  }

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, }));
  }

  handlePictureClick = (largeImageURL) => {
    this.toggleModal();
    this.setState({ selectedImage: largeImageURL });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, }));
  }

  render() {
    const { photos, searchQuery, isLoading, showModal, picsShown, totalHits, selectedImage } = this.state;
    const showLoadMoreBtn = picsShown < totalHits && !isLoading;

    return (
      <AppStyled>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery >
          <ImageGalleryItem pics={photos} alt={searchQuery} onImageClicked={this.handlePictureClick} />
        </ImageGallery>
        {isLoading && <Loader />}
        {showLoadMoreBtn && <Button label="Load more" onClick={this.handleLoadMoreBtnClick} />}
        {showModal && <Modal onClose={this.toggleModal} largeImg={selectedImage} />}
      </AppStyled>
    );
  }
}

export default App;