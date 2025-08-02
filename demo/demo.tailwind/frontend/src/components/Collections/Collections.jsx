import React from 'react';
import './Collections.scss'; // Giả sử bạn đang sử dụng SCSS cho styling
const collections = [
  {
    id: 1,
    name: 'Đồ uống',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 2,
    name: 'Món khai vị',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 3,
    name: 'Món chính',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 4,
    name: 'Món tráng miệng',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 5,
    name: 'Đồ ăn nhanh',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 6,
    name: 'Đồ chay',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 7,
    name: 'Hải sản',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: 8,
    name: 'Đồ nướng',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  }
];
const CollectionComponent = () => {
  return (
    <div>
      <h1>Bộ sưu tập món ăn</h1>
      <div className='collections-container'>
        {collections.map((collection) => (
          <div key={collection.id} className='collection-card'>
            <img className='collection-image' src={collection.imageUrl} alt={collection.name} />
            <div className='collection-name'>{collection.name}</div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default CollectionComponent;