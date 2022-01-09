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
        <>
          {isLoggedIn ? (
            <button onClick={logOut}>Log out</button>
          ) : (
            <SubNavigation />
          )}
          {isLoggedIn && (
            <>
              {user.name}
              {user.email}
            </>
          )}
        </>
      )}
    </>
  );
}
