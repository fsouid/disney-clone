import styled from "styled-components";
import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setUserLogout,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserLogin(user));
        navigate("/home");
      } else {
        dispatch(setUserLogout());
      }
    });
  }, [dispatch, navigate]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          // Sign in with Google popup
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setUserLogout());
          navigate("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLogin({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }),
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/assets/logo.svg" alt="Disney+" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>LOGIN</Login>
      ) : (
        <>
          <NavMenu>
            <Link to="/home">
              <img src="/assets/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </Link>
            <Link to="/home">
              <img src="/assets/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </Link>
            <Link to="/home">
              <img src="/assets/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </Link>
            <Link to="/home">
              <img src="/assets/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </Link>
            <Link to="/home">
              <img src="/assets/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </Link>
            <Link to="/home">
              <img src="/assets/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </Link>
          </NavMenu>
          <SignOut onClick={handleAuth}>
            <UserAvatar src={userPhoto} alt={userName} />
            <DropDown>Sign Out</DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  padding: 0px;
  position: relative;
  margin: 0 auto 0 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        right: 0px;
        left: 0px;
        content: "";
        height: 2px;
        opacity: 0;
        position: absolute;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(235, 235, 235, 0.2);
  padding: 8px 16px;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 250ms ease-in-out;

  &:hover {
    background-color: #f9f9f9;
    border-color: transparent;
    color: #090b13;
    transform: scale(1.05);
  }
`;

const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(151, 151, 151, 0.34);
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;

const DropDown = styled.div`
  position: absolute;
  width: 100px;
  top: 50px;
  right: 0;
  background-color: #131313;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  letter-spacing: 2px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const SignOut = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    ${UserAvatar} {
      transform: scale(1.1);
    }
    ${DropDown} {
      opacity: 1;
    }
  }
`;

export default Header;
