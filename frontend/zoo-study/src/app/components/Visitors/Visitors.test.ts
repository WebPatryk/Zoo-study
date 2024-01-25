import { render, screen } from '@testing-library/react';
import Visitors from '@/app/components/Visitors/Visitors';

const mockVisitorsData = [
  { year: 2016, userGain: 100 },
  { year: 2017, userGain: 150 }
];

describe('Visitors Component', () => {
  it("renders Zoo's Visitors component correctly", () => {
    render(<Visitors visitorsData={mockVisitorsData} />);

    const titleElement = screen.getByText("Zoo's Visitors");
    expect(titleElement).toBeInTheDocument();

    const chartElement = screen.getByTestId('chart-element');
    expect(chartElement).toBeInTheDocument();
  });

  it('displays correct chart data', () => {
    render(<Visitors visitorsData={mockVisitorsData} />);

    const chartData = screen.getByTestId('chart-element').__vue__._chart.data;
    expect(chartData.labels).toEqual(mockVisitorsData.map(data => data.year));
    expect(chartData.datasets[0].data).toEqual(
      mockVisitorsData.map(data => data.userGain)
    );
  });

  it('displays correct chart title', () => {
    render(<Visitors visitorsData={mockVisitorsData} />);

    const titleElement = screen.getByText('Users Gained between 2016-2020');
    expect(titleElement).toBeInTheDocument();
  });
});
