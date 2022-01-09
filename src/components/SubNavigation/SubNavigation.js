import { NavLink } from 'react-router-dom';
import s from './SubNavigation.module.css';

export default function SubNavigation() {
  const activeClass = [s.subLink, s.active];
  return (
    <div className={s.firstMenu}>
      <NavLink
        to="login"
        className={({ isActive }) =>
          isActive ? activeClass.join(' ') : s.subLink
        }
      >
        Login
      </NavLink>
      <NavLink
        to="registration"
        className={({ isActive }) =>
          isActive ? activeClass.join(' ') : s.subLink
        }
      >
        Registration
      </NavLink>
    </div>
  );
}
