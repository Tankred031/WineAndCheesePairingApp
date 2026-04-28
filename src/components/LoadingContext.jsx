import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function showLoading(msg = 'Učitavam podatke...') {
    setMessage(msg)
    setLoading(true);
  }

  function hideLoading() {
    setLoading(false);
    setMessage('');
  }

  const value = {
    loading,
    message,
    showLoading,
    hideLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};