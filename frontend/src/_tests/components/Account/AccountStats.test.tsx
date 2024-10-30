import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountStats from '../../../components/Account/AccountStats';
import { useAccountStats } from '../../hooks/Account.hooks';

jest.mock('../../hooks/Account.hooks', () => ({
  useAccountStats: jest.fn(), // Create a mock function for the hook
}));

describe('AccountStats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const RenderAccountStats = () => {
    const { statistics } = useAccountStats();
    render(<AccountStats statistics={statistics} />);
  };

  it('renders statistic data correctly', () => {
    const mockStats = {
      totalCount: 1,
      activeCount: 2,
      inactiveCount: 3,
      softDeleteCount: 4,
      holdCount: 5,
    };

    (useAccountStats as jest.Mock).mockReturnValue({
      statistics: mockStats,
    });

    RenderAccountStats();

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(3)).toBeInTheDocument();
    expect(screen.getByText(4)).toBeInTheDocument();
    expect(screen.getByText(5)).toBeInTheDocument();
  });
});
