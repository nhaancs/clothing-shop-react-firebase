import { User } from "firebase/auth";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { auth } from "../../firebase/firebase.utils";
import './header.styles.scss';


interface HeaderProps {
    currentUser: User
}

const Header = (props: HeaderProps) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                props.currentUser ? 
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> : 
                    <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
    </div>
)

const mapStateToProps = (state: any) => ({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(Header)
