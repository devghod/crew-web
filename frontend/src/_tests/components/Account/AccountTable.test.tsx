import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountTable from '../../../components/Account/AccountTable';
import { useAccountStore } from '../../hooks/Account.hooks';

jest.mock('../../hooks/Account.hooks', () => ({
  useAccountStore: jest.fn(), // Create a mock function for the hook
}));

describe('AccountTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const RenderAccountTable = () => {
    const { users, isLoading } = useAccountStore();
    render(<AccountTable users={users} isLoading={isLoading} />);
  };

  it('renders loading state', () => {
    (useAccountStore as jest.Mock).mockReturnValue({
      users: [],
      isLoading: true,
    });

    RenderAccountTable();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders no data message', () => {
    (useAccountStore as jest.Mock).mockReturnValue({
      users: [],
      isLoading: false,
    });

    RenderAccountTable();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('renders user data correctly', () => {
    const mockUsers = [
      {
        _id: '1',
        username: 'user1',
        email: 'user1@example.com',
        date_created: '2023-01-01',
        status: 'active',
      },
      {
        _id: '2',
        username: 'user2',
        email: 'user2@example.com',
        date_created: '2023-01-02',
        status: 'inactive',
      },
    ];

    (useAccountStore as jest.Mock).mockReturnValue({
      users: mockUsers,
      isLoading: false,
    });

    RenderAccountTable();

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('2023-01-02')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('inactive')).toBeInTheDocument();
  });
});
