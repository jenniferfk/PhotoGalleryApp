import '@testing-library/jest-native' 
import React from 'react';
import { render } from '@testing-library/react-native';
import MainNavigator from './MainNavigator';

describe('MainNavigator', () => {
  it('header title has bold font weight', () => {
    const { getByTestId } = render(<MainNavigator />);
    const headerTitle = getByTestId('header-title');

    expect(headerTitle).toHaveStyle({ fontWeight: 'bold' });
  });
});
