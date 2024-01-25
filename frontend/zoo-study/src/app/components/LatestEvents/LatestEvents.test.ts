import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LatestEvents from './LatestEvents';

describe('LatestEvents Component', () => {
  const mockEvent = {
    _id: '1',
    title: 'Test Event',
    image: 'test_image.jpg',
    starts_at: new Date(),
    events: [],
    setEvents: jest.fn()
  };

  it('renders event information correctly', () => {
    render(<LatestEvents {...mockEvent} />);

    // Check if event details are rendered
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Open party')).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor/)).toBeInTheDocument();
  });

  it('displays "Event has passed" if the event has already occurred', () => {
    const pastEvent = { ...mockEvent, starts_at: new Date('2022-01-01') };
    render(<LatestEvents {...pastEvent} />);

    expect(screen.getByText('Event has passed')).toBeInTheDocument();
  });

  it('displays days left if the event is in the future', () => {
    const futureEvent = { ...mockEvent, starts_at: new Date('2023-01-01') };
    render(<LatestEvents {...futureEvent} />);

    expect(screen.getByText(/days left/)).toBeInTheDocument();
  });

  it('opens modal when remove button is clicked', () => {
    render(<LatestEvents {...mockEvent} />);

    fireEvent.click(screen.getByText('Read more 🡢')); // Click the "Read more" link

    expect(
      screen.getByText('Are you sure you want to remove it?')
    ).toBeInTheDocument();
  });

  it('calls setEvents and closes modal when remove button in modal is clicked', async () => {
    render(<LatestEvents {...mockEvent} />);

    fireEvent.click(screen.getByText('Read more 🡢')); // Open modal
    fireEvent.click(screen.getByText('Remove')); // Click "Remove" button in modal

    await waitFor(() => {
      expect(mockEvent.setEvents).toHaveBeenCalledWith(expect.any(Function));
      expect(
        screen.queryByText('Are you sure you want to remove it?')
      ).not.toBeInTheDocument();
    });
  });

  it('closes modal when close button in modal is clicked', () => {
    render(<LatestEvents {...mockEvent} />);

    fireEvent.click(screen.getByText('Read more 🡢')); // Open modal
    fireEvent.click(screen.getByText('Close')); // Click "Close" button in modal

    expect(
      screen.queryByText('Are you sure you want to remove it?')
    ).not.toBeInTheDocument();
  });
});
