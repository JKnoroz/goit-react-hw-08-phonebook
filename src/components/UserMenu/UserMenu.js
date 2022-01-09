import {
  useLogOutUserMutation,
  useGetCurrentUserQuery,
} from '../../redux/phonebook';
import { useSelector } from 'react-redux';

import SubNavigation from '../SubNavigation/SubNavigation';
import {
  getIsLoggedIn,
  selectCurrentUser,
} from '../../redux/auth/authSelectors';

import s from './UserMenu.module.css';

export default function UserMenu() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const [logOut] = useLogOutUserMutation();
  const { isFetching } = useGetCurrentUserQuery();
  return (
    <>
      {isFetching ? (
        ''
      ) : (
        <div className={s.userMenu}>
          <div className={s.logout}>
            {isLoggedIn ? (
              <button className={s.logoutButton} onClick={logOut}>
                Log out
              </button>
            ) : (
              <SubNavigation />
            )}
          </div>
          <div className={s.user}>
            {isLoggedIn && (
              <>
                <li>{user.name}</li>
                <li>{user.email}</li>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
