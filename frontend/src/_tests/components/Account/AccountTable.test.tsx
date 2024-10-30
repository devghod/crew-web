import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountTable from '../../../components/Account/AccountTable';

const mockUseAccountStore = jest.fn();

describe('AccountTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseAccountStore.mockReturnValue({
      users: [],
      isLoading: true,
    });

    render(
      <AccountTable
        users={mockUseAccountStore().users}
        isLoading={mockUseAccountStore().isLoading}
      />,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders no data message', () => {
    mockUseAccountStore.mockReturnValue({
      users: [],
      isLoading: false,
    });

    render(
      <AccountTable
        users={mockUseAccountStore().users}
        isLoading={mockUseAccountStore().isLoading}
      />,
    );
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

    mockUseAccountStore.mockReturnValue({
      users: mockUsers,
      isLoading: false,
    });

    render(
      <AccountTable
        users={mockUseAccountStore().users}
        isLoading={mockUseAccountStore().isLoading}
      />,
    );

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
