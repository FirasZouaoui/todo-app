jest.mock('axios', () => ({
  create: () => ({
    post: jest.fn().mockResolvedValue({
      data: { token: 'fake-token', user: { name: 'test' } },
    }),
  }),
}));


import { render, screen } from '@testing-library/react';
import Register from '../components/Register.jsx'; 
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../context/TokenContext.js', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.createContext({
      userToken: null,
      tokenDispatch: jest.fn(),
      userDispatch: jest.fn(),
    }),
  };
});

describe('Register Component', () => {
  test('renders input fields and register button', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });
});
