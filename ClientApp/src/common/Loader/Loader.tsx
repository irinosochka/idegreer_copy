import React from 'react';
import loader from '../../assets/img/loader.svg'
import './loader.css'

const Loader = () => {

    return (
        <div className={'loader'}>
            <img src={loader} alt=""/>
        </div>
    )

};

export default Loader;
