import React from 'react';
import image from '../photos/page-not-found.jpg';

const PageNotFound = () => {
    return (
        <React.Fragment>
            <div className="page-not-found">
                <img src={image} alt="Page Not Found" />
            </div>
        </React.Fragment>
    );
};

export default PageNotFound;
