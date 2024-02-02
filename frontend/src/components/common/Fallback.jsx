import React from 'react';
import DotsWaveLoading from '../loadings/DotsWaveLoading';

const Fallback = () => {
    return (
		<div className="flex items-center justify-center w-full h-screen">
			<DotsWaveLoading></DotsWaveLoading>
		</div>
	);
};

export default Fallback;