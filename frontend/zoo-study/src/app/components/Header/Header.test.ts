import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Header Component', () => {
  it('renders user information correctly', async () => {
    const mockUser = { name: 'Test User' };
    localStorage.setItem('email', 'test@example.com');

    useRouter.mockReturnValue({
      push: jest.fn()
    });

    render(<Header />);

    // Check if user details are rendered
    expect(screen.getByText('Test User')).toBeInTheDocument();

    // Check if the getUserProfile function is called
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Mock the response for getUserProfile
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockUser)
    });

    // Check if the Profile link is rendered and clickable
    fireEvent.click(screen.getByText('Test User'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('logs out when the Logout link is clicked', async () => {
    localStorage.setItem('email', 'test@example.com');

    const mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush
    });

    render(<Header />);

    // Check if the Logout link is rendered and clickable
    fireEvent.click(screen.getByText('Test User'));
    fireEvent.click(screen.getByText('Logout'));

    // Check if the logout function is called
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'));

    // Check if local storage is cleared
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
    expect(localStorage.getItem('app-user-id')).toBeNull();
  });
});
