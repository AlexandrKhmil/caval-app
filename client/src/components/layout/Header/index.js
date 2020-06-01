import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { 
  modalLoginOpen, 
  modalRegOpen, 
  modalCartOpen 
} from '../../actions/modal';
import { logoutUser } from '../../actions/account';
import styles from './styles.module.css';

const Header = () => {
  const unauthLinks = (
    <>
      <li className="nav-item">
        <button 
          className="nav-link btn btn-link"
          onClick={modalLoginOpen}>
          Login
        </button>
      </li>
      <li className="nav-item">
        <button 
          className="nav-link btn btn-link"
          onClick={modalRegOpen}>
          Register
        </button>
      </li>
    </>
  );
  
  const authLinks = (
    <>
      <li className="nav-item">
        <p className="text-light mb-0 mr-3">Welcome {email}!</p>
      </li>
      <li className="nav-item">
        <button 
          className="nav-link btn btn-link"
          onClick={logoutUser}>
          Logout
        </button>
      </li>
    </>
  );

  return (
    <header className="pt-4 pb-5">
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <NavLink className="navbar-brand" to="/">Brand</NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/checkout">Checkout</NavLink>
            </li>
            {isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/user-page">My orders</NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto align-items-center">
            {!isAuth ? unauthLinks : authLinks}
            <li className="nav-item">
              <button 
                className="nav-link btn btn-info d-flex align-items-center p-2"
                onClick={modalCartOpen}>
                <span className="mr-2">{cartCount}</span>
                <img className={styles.cartImg} src={require('../../static/shopping-cart.svg')} alt="Cart" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.account.isAuth,
  email: state.account.email,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);