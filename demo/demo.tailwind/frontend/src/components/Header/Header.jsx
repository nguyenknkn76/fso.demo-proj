import React, { useState } from 'react';
import './Header.scss'; // Giả sử bạn đang sử dụng SCSS cho styling

const addresses = [
  '2 Ngách 20 Ngõ 266 Nguyễn Văn Cừ, P.Bồ Đề 1',
  '10 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
  '15 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
  '20 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh'
];

const ChooseOrderAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  return (
    <div className='choose-order-address'>
      <h1 className='text-white text-xl mb-2'>Địa chỉ bạn muốn giao món</h1>
      <div className='bg-white p-2 rounded-lg shadow-md'>
        {addresses.map((address, index) => (
          <div
            key={index}
            className={`p-2 hover:bg-gray-200 cursor-pointer ${selectedAddress === address ? 'bg-gray-200' : ''}`}
            onClick={() => setSelectedAddress(address)}
          >
            {address}
          </div>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className='header-container'>
      <div className='page-logo'>beFood</div>
      <div className='search-bar'>
        <input className='search-input' type='text' placeholder='Tìm món ăn hoặc nhà hàng' />
        <button className='search-button'>Tìm kiếm</button>
      </div>
      <div className='login-register'>Đăng nhập/Đăng ký</div>
      <ChooseOrderAddress />
    </header>
  );
};

export default Header;