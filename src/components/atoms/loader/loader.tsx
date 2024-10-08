import Pokeball from '../../../assets/pokeball.svg';

import './loader.scss';

const Loader = () => {
    return (
        <div className="loader">
            <img src={Pokeball} alt="Pokeball" />
        </div>
    );
};

export default Loader;