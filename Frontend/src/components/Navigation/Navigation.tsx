import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { routes } from '../../app/routes';
import s from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const { home, search, cart } = routes;
  return (
    <div>
      <nav className={s.nav}>
        <NavLink
          to={home}
          className={({ isActive }) => {
            return isActive ? `${s.navLinks} ${s.activeNavLink}` : s.navLinks;
          }}
        >
          Home
        </NavLink>
        <NavLink
          to={search}
          className={({ isActive }) => {
            return isActive ? `${s.navLinks} ${s.activeNavLink}` : s.navLinks;
          }}
        >
          Search
        </NavLink>
        <NavLink
          to={cart}
          className={({ isActive }) => {
            return isActive ? `${s.navLinks} ${s.cartLinks} ${s.activeNavLink}` : `${s.navLinks} ${s.cartLinks}`;
          }}
        >
          Cart
        </NavLink>
      </nav>
      <div className={s.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;
