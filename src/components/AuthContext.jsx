import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';
import OperaterService from '../services/operateri/OperaterService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {

    const operater = localStorage.getItem('operater');

    if (operater) {

      setAuthUser(JSON.parse(operater));
      setIsLoggedIn(true);

    } else {

      setIsLoggedIn(false);

    }

  }, []);

  async function login(email, lozinka) {

    const odgovor =
      await OperaterService.prijava(email, lozinka);

    if (odgovor.success) {

      localStorage.setItem(
        'operater',
        JSON.stringify(odgovor.data)
      );

      setAuthUser(odgovor.data);

      setIsLoggedIn(true);

      // BROJAČ PRIJAVA
      const prijave = JSON.parse(
        localStorage.getItem('brojPrijava')
      ) || {};

      prijave[odgovor.data.email] =
        (prijave[odgovor.data.email] || 0) + 1;

      localStorage.setItem(
        'brojPrijava',
        JSON.stringify(prijave)
      );

      navigate(RouteNames.NADZORNA_PLOCA);

    } else {

      alert(odgovor.message);

      localStorage.removeItem('operater');

      setAuthUser({});

      setIsLoggedIn(false);
    }
  }

  function logout() {

    localStorage.removeItem('operater');

    setAuthUser({});

    setIsLoggedIn(false);

    navigate(RouteNames.HOME);
  }

  const value = {
    isLoggedIn,
    authUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}