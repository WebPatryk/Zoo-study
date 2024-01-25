import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders the footer with correct content', () => {
    render(<Footer />);

    // Check if the logo and name are rendered
    expect(screen.getByAltText('icon')).toBeInTheDocument();
    expect(screen.getByText('Zoo Admin Portal')).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        'Zoo Admin Portal is an advanced administrative tool created for zoo managers. The portal enables efficient management of all aspects of zoo operations, providing full control and transparency'
      )
    ).toBeInTheDocument();

    // Check if social media icons are rendered
    expect(screen.getAllByAltText('Social media icon')).toHaveLength(3);

    // Check if "Follow us" text is rendered
    expect(screen.getByText('Follow us')).toBeInTheDocument();

    // Check if "Call us" text and phone number are rendered
    expect(screen.getByText('Call us')).toBeInTheDocument();
    expect(screen.getByText('123 456 789')).toBeInTheDocument();

    // Check if the sub-footer content is rendered
    expect(
      screen.getByText('© Zoo Admin Portal, Patryk Lekki, All Right Reserved')
    ).toBeInTheDocument();
  });
});
