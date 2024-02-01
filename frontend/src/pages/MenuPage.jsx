import React from 'react';
import MenuLeftContent from '../modules/menu/MenuLeftContent';
import LoadingCenter from '../modules/common/LoadingCenter';
import OrderCart from '../modules/menu/OrderCart';
import { Outlet } from 'react-router-dom';

const MenuPage = () => {
    const isFetching = false;
    return (
		<div className="menu">
			<MenuLeftContent></MenuLeftContent>

			{isFetching && <LoadingCenter />}

			{/* {id && (
				<OrderCart onToggle={() => handleToggleValue()}>
					<Outlet
						context={{
							id,
							tableName: orderDetail?.data?.tableName,
							isActive: value,
							onToggle: () => handleToggleValue(),
						}}
					></Outlet>
				</OrderCart>
			)} */}
		</div>
	);
};

export default MenuPage;