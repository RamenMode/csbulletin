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

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    function checkAuthenticated() {
        fetch('http//localhost:4000/user', {
            method: 'GET',
            credentials: 'include'
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((responseJson) => {
               console.log(responseJson)
        })
        .catch((error) => {
                console.log(error)
        });
              
    }

    useEffect(() => {
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
                    {!button ? <li className = 'nav-item'>
                        <a href="http://localhost:4000/api/auth/steam" class="steambutton">
                            <span>Login With Steam</span>
                            <div class="icon">
                                <i class="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li> : null}
                </ul>
                {button ? <li className = 'nav-item-button'>
                        <a href="http://localhost:4000/api/auth/steam" class="steambutton">
                            <span>Login With Steam</span>
                            <div class="icon">
                                <i class="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li> : null}
            </div>
        </nav>
    </>
  )
}

export default Navbar