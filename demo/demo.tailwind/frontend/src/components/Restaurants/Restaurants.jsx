import React, { useEffect, useState } from 'react';
import './Restaurants.scss'; // Giả sử bạn đang sử dụng SCSS cho styling
import axios from 'axios';


// const restaurants = [
//   {
//     id: 1,
//     name: 'First Restaurant',
//     total_rating: 5,
//     review_count: 100,
//     email: 'firstrestaurant@sample.com',
//     phone_number: '0132456789',
//     is_closed: false,
//     address: '5, Nguyễn Văn Cừ, Long Biên, Hà Nội',
//     collection_id: 1,
//     imageUrl: 'https://statics.vincom.com.vn/xu-huong/nha-hang/Nha-hang-Wrap-and-Roll.jpg'
//   },
//   {
//     id: 2,
//     name: 'Second Restaurant',
//     total_rating: 4.5,
//     review_count: 80,
//     email: 'secondrestaurant@sample.com',
//     phone_number: '0123456789',
//     is_closed: false,
//     address: '10, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
//     collection_id: 2,
//     imageUrl: 'https://statics.vincom.com.vn/xu-huong/nha-hang/Nha-hang-Wrap-and-Roll.jpg'
//   },
//   {
//     id: 3,
//     name: 'Third Restaurant',
//     total_rating: 4,
//     review_count: 60,
//     email: 'thirdrestaurant@sample.com',
//     phone_number: '0113456789',
//     is_closed: false,
//     address: '15, Lê Lợi, Quận 1, TP. Hồ Chí Minh',
//     collection_id: 3,
//     imageUrl: 'https://statics.vincom.com.vn/xu-huong/nha-hang/Nha-hang-Wrap-and-Roll.jpg'
//   },
//   {
//     id: 4,
//     name: 'Fourth Restaurant',
//     total_rating: 3.5,
//     review_count: 50,
//     email: 'fourthrestaurant@sample.com',
//     phone_number: '0103456789',
//     is_closed: false,
//     address: '20, Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
//     collection_id: 4,
//     imageUrl: 'https://statics.vincom.com.vn/xu-huong/nha-hang/Nha-hang-Wrap-and-Roll.jpg'
//   }
// ];

const RestaurantsComponent = () => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/restaurants')
            .then(res => res.data)
            .then(data => setRestaurants(data))
    },[])
    
  return (
    <div className='restaurants-container'>
      {restaurants?.map((restaurant) => (
        <div key={restaurant.id} className='restaurant-card'>
          <img className='restaurant-image' src={restaurant.imageUrl} alt={restaurant.name} />
          <div className='restaurant-details'>
            <div className='restaurant-name'>{restaurant.name}</div>
            <div className='restaurant-info'>Rating: {restaurant.total_rating} ({restaurant.review_count} reviews)</div>
            {/* <div className='restaurant-info'>Email: {restaurant.email}</div>
            <div className='restaurant-info'>Phone: {restaurant.phone_number}</div> */}
            <div className='restaurant-info'>Address: {restaurant.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantsComponent;