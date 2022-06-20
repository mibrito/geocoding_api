import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { NavbarData } from './data'
import './styles.css'

const Navbar = () => {
  const [sidebar] = useState(false)

  return (
    <div className='nav-menu-container'>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                  {index <= NavbarData.length - 2 ? <span>•</span> : <span />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
