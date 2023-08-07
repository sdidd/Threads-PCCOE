// final code
import React from 'react'
import "./Navbar.css";
import ProfilePopup from './ProfilePopup';

export default function Navbar(props, status) {
  return (
    <div className='Navbar'>
      <p className='logo'>
        <img
          src='https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg'
          width='30px'
          alt='logo'
        />{' '}
        Threads PCCOE
      </p>
      <div className='search'>
        <input />{' '}
        <img src='https://www.nicepng.com/png/detail/965-9653559_search-icon-circle.png' />
      </div>
      <div className='right'>
        
        <ProfilePopup />
      </div>
    </div>
  )
}