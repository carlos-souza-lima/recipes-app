import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../Pages/Login';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const buttonTestId = 'login-submit-btn';

const testEmail = 'tryber@teste.com';
const testPassword = '1234567';

test('testa se os elementos do login estão na página', () => {
  renderWithRouter(<Login />);

  const emailInput = screen.getByTestId(emailTestId);
  const passwordInput = screen.getByTestId(passwordTestId);
  const loginBtn = screen.getByTestId(buttonTestId);

  expect(emailInput).toBeVisible();
  expect(passwordInput).toBeVisible();
  expect(loginBtn).toBeVisible();
});

test('testa se os elementos são interagiveis', () => {
  renderWithRouter(<Login />);

  const emailInput = screen.getByTestId(emailTestId);
  const passwordInput = screen.getByTestId(passwordTestId);
  const loginBtn = screen.getByTestId(buttonTestId);

  fireEvent.change(emailInput, { target: { value: testEmail } });
  fireEvent.change(passwordInput, { target: { value: testPassword } });

  expect(emailInput.value).toBe(testEmail);
  expect(passwordInput.value).toBe(testPassword);
  expect(loginBtn.disabled).toBe(false);
});
