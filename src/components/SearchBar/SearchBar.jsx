import PropTypes from 'prop-types';
import { SiPixabay } from 'react-icons/si';
import { GoSearch } from 'react-icons/go';
import { SearchBarSection, SearchForm, SearchFormButton, SearchFormInput } from './SearchBar.styled';

const SearchBar = ({onSubmit}) => {
    return (<SearchBarSection>
        <SiPixabay style={{ position: "absolute", left: 200, top: 10, }} size={40} color={"white"}></SiPixabay>
        <SearchForm onSubmit={onSubmit}>
            <SearchFormButton type="submit"><GoSearch /></SearchFormButton>
            <SearchFormInput
                type="text"
                name="searchQuery"
                autocomplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </SearchForm>
    </SearchBarSection>
    );
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default SearchBar;