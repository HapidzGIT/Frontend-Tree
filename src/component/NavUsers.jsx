import { LogOut, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../AxiosInstance';
import toast from 'react-hot-toast';

const NavLinks = () => {
  const navigate = useNavigate();
  const handelLogout = async (e) => {
    const confirmLogout = confirm('Yakin nih Logout?');
    if (confirmLogout) {
      try {
        e.preventDefault();
        const response = await AxiosInstance.post('logout');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('permission');
        localStorage.removeItem('role');
        navigate('/');
        toast.success('Logout succes');
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <NavLink to="/userdashboard" className="text-black w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2">
        Home
      </NavLink>
      <NavLink to="/cart" className="text-black w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2">
        Cart
      </NavLink>
      <NavLink to="/Wishlist" className="text-black w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2">
        Wishlist
      </NavLink>
      <NavLink to="/Profile" className="px-5 w-full text-black flex items-center justify-center gap-5">
        <h1 className="text-md bg-gray-200 px-2 py-1 rounded-xl hover:bg-gray-400">Profile</h1>
      </NavLink>

      <button onClick={handelLogout} type="submit" className="text-black w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2">
        Logout
      </button>
    </>
  );
};

const Nav = () => {
  const [opened, setOpened] = useState(false);

  const handleNav = () => {
    setOpened(!opened);
  };
  return (
    <>
      <div className="w-1/3">
        <div className="md:flex text-white items-center justify-between hidden">
          {' '}
          <NavLinks />
        </div>
      </div>
      <button className="md:hidden" onClick={handleNav}>
        {opened ? <X size={25} color="black" /> : <Menu size={25} color="black" />}
      </button>
      {opened && (
        <div className="flex text-white basis-full flex-col mb-5  items-center">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Nav;
