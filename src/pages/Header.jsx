import React, {useContext} from 'react'
import './header.css'
import userImage from '../images/user.jpg'
import { AppContext } from '../App'

function Header( {toggleActive, navData, navOnClick} ) {
    const {library, bag} = useContext(AppContext)
  return (
    <header>
        <a href="#" className="menu" onClick={toggleActive}>
            <i class="bi bi-sliders"></i>
        </a>
        <div className="userItems">
            <a href="#" className="icon" onClick={()=>navOnClick(3, 'library')}>
                <i class="bi bi-heart-fill"></i>
                <span className="like">{library.length}</span>
            </a>
            <a href="#" className="icon" onClick={()=>navOnClick(4, 'bag')}>
                <i class="bi bi-bag-fill"></i>
                <span className="bag">{bag.length}</span>
            </a>
            <div className="avatar">
                <a href="#">
                    <img src={userImage} alt="user image" />
                </a>
                <div className="user">
                    <span>User Name</span>
                    <a href="#">View Profile</a>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header