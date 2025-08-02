import React, { useState } from 'react';
import './ChooseOrderAddres.scss'; // Giả sử bạn đang sử dụng SCSS cho styling

const addresses = [
  '2 Ngách 20 Ngõ 266 Nguyễn Văn Cừ, P.Bồ Đề 1',
  '10 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
  '15 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
  '20 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh'
];

const ChooseOrderAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  return (
    <div className='choose-order-address-container'>
      <h1 className='choose-order-address-title'>Địa chỉ bạn muốn giao món</h1>
      <div className='choose-order-address-dropdown'>
        {addresses.map((address, index) => (
          <div
            key={index}
            className={`choose-order-address-option ${selectedAddress === address ? 'bg-gray-200' : ''}`}
            onClick={() => setSelectedAddress(address)}
          >
            {address}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseOrderAddress;