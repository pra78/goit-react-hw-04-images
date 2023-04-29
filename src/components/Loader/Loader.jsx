import { Bars } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';

const Loader = () => {
    return (
        <LoaderStyled>
            <Bars
                height="80"
                width="80"
                color="#3f51b5"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </LoaderStyled>
    );
}

export default Loader;