import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Statistic from '../../pages/StatisticsPage';

describe('Statistics Page Component tests', () => {
  it('Renders correctly initial document', async () => {
    render(<Statistic />);
    const result = screen.getByText(/statistics/i);
    expect(result).toBeInTheDocument();
  });
});
