import React from 'react';
import CircleLoading from '../../components/loadings/CircleLoading';

const LoadingCenter = ({className = '', color='#ff7200'}) => {
    return (
        <div className={`flex items-center justify-center w-full ${className}`}>
			<CircleLoading color={color}></CircleLoading>
		</div>
    );
};

export default LoadingCenter;