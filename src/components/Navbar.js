import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScroll, faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';


function Navbar() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [button, setButton] = useState(true)
    const [user, setUser] = useState('')

    const [profileSelected, setProfileSelected] = useState(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    const profileClicked = () => {
        setProfileSelected(!profileSelected)
    }

    async function checkAuthenticated() {
        console.log("hello")
        fetch('http://localhost:4000/user', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(text => setUser(text ? text.photos[1].value : ''))
        
    }
    
    useEffect(() => {
        console.log("Checked")
        showButton()
        checkAuthenticated()
    }, [])

    window.addEventListener('resize', showButton);

  return (
    <>
        <nav className = "navbar">
            <div className = "navbar-container">
                <Link to="/" className="navbar-logo" onClick = {closeMobileMenu}>
                    CS Bulletin <FontAwesomeIcon icon={faScroll} />
                </Link>
                <div className = 'menu-icon' onClick = {handleClick}>
                    <FontAwesomeIcon icon = {click ? faCircleXmark : faBars}/>
                </div>
                <ul className = {click ? 'nav-menu active': 'nav-menu'}>
                    <li className = 'nav-item'>
                        <Link to='/' className = 'nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className = 'nav-item'>
                        <Link to='/bulletin' className = 'nav-links' onClick={closeMobileMenu}>
                            Bulletin
                        </Link>
                    </li>
                    <li className = 'nav-item'>
                        <Link to='/about-us' className = 'nav-links' onClick={closeMobileMenu}>
                            FAQ
                        </Link>
                    </li>
                    {user ? <li className = 'nav-item'>
                        <a href="http://localhost:4000/logout" className = 'nav-links' onClick={closeMobileMenu}>
                            Sign Out
                        </a>
                    </li> : null}
                    {button ? null : user ? <li className = 'nav-item-modified'>
                        <a href="http://localhost:4000/logout" class="steambutton">
                            <span>Sign Out</span>
                            <div className="icon">
                                <i className="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li> : <li className = 'nav-item-modified'>
                        <a href="http://localhost:4000/auth/steam" class="steambutton">
                            <span>Login With Steam</span>
                            <div className="icon">
                                <i className="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li>}
                </ul>
                {!button ? null : !user ? <li className = 'nav-item-button'>
                        <a href="http://localhost:4000/auth/steam" class="steambutton">
                            <span>Login With Steam</span>
                            <div className="icon">
                                <i className="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li> : <a onClick = {profileClicked} className = "profilelink"><img className = "profilepic" src = {`${user}`}/></a>}
            </div>
        </nav>
    </>
  )
}
export default Navbar