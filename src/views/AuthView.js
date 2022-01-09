import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';

export default function LoginView() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="login" />} />
        <Route path="login" element={<AuthForm />} />
        <Route path="registration" element={<AuthForm />} />
      </Routes>
    </>
  );
}
