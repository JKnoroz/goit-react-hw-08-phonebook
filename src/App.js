import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthView from './views/AuthView';
import ContactsView from '../src/views/ContactsView';
import { useGetCurrentUserQuery } from './redux/phonebook';
import PrivateRoute from './components/PrivateRoad';
import PublicRoute from './components/PublicRoad';
import UserMenu from './components/UserMenu';

function App() {
  const { isFetching } = useGetCurrentUserQuery();
  return (
    <>
      <UserMenu />
      <>
        {isFetching ? (
          ''
        ) : (
          <>
            <Routes>
              <Route
                path="contacts"
                element={
                  <PrivateRoute>
                    <ContactsView />
                  </PrivateRoute>
                }
              />

              <Route
                path="*"
                element={
                  <PublicRoute restricted={true}>
                    <AuthView />
                  </PublicRoute>
                }
              />
            </Routes>
          </>
        )}
      </>
    </>
  );
}

export default App;
