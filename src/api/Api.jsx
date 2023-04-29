import axios from 'axios';

const refs = {
  API_URL: "https://pixabay.com/api/",
  KEY: "34884087-7348ee16e468132adc353bbfc",
}

const fetchImages = async (searchQuery, page) => {
    const request_url = `${refs.API_URL}?key=${refs.KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
    try {
        const request = await axios(request_url);
        return request.data;
    } catch (error) {
        console.error(error);
    }
}

export default fetchImages;