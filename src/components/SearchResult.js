import React from 'react';

const SearchResult = ({imgUrl, title, subTitle}) => {
    return (
        <div className="result_box">
            <img src={imgUrl} />
            <div>
                <span className='title'> {title} </span>
                <span className='subTitle'> {subTitle} </span>
            </div>
        </div>
    )
}

export default SearchResult; 