import { useState, useEffect } from 'react';

export const useAccountStore = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch('/api/users'); // Example API call
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { users, isLoading };
};
