import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScroll, faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setEmpty } from '../redux/counter.js'


function Navbar() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const userStatus = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    const [button, setButton] = useState(true)
    //const [user, setUser] = useState('')

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
        fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/user', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(text => text ? dispatch(setUser(text.photos[1].value)) : dispatch(setEmpty()))
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
                        <Link to='/faq' className = 'nav-links' onClick={closeMobileMenu}>
                            FAQ
                        </Link>
                    </li>
                    {userStatus ? <li className = 'nav-item'>
                        <a href={process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + "/logout"} className = 'nav-links' onClick={closeMobileMenu}>
                            Sign Out
                        </a>
                    </li> : null}
                    {button ? null : userStatus ? <li className = 'nav-item-modified'>
                        <a href={process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + "/logout"} className="steambutton" >
                            <span>Sign Out</span>
                            <div className="icon">
                                <i className="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li> : <li className = 'nav-item-modified'>
                        <a className="steambutton" href = {process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + "/auth/steam"}>
                            <span>Login With Steam</span>
                            <div className="icon">
                                <i className="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li>}
                </ul>
                {!button ? null : !userStatus ? <li className = 'nav-item-button'>
                        <a className="steambutton" href = {process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + "/auth/steam"}>
                            <span>Login With Steam</span>
                            <div className="icon">
                                <i className="fa fa-steam-square"></i>
                            </div>
                        </a>
                    </li> : <Link to='/editProfile' onClick = {profileClicked} className = "profilelink"><img className = "profilepic" src = {`${userStatus}`}/></Link>}
            </div>
        </nav>
    </>
  )
}
export default Navbar