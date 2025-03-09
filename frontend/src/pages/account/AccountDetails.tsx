import { useEffect, useState } from 'react';
import { useAccountStore } from '../../stores/accountStore';
import { useParams } from "react-router-dom";
import { TUser } from '../../types/AccountType';

const AccountDetails = () => {
  const { getUser, isLoading } = useAccountStore();
  const [userDetails, setUserDetails] = useState<TUser | {}>();
  const { id } = useParams(); 
  
  if (!id) {
    console.log("No ID");
    return;
  }


  useEffect(() => {
    handleGetUser(id);
  }, [id]);

  async function handleGetUser(id: string) {
    const { success, data } = await getUser(id);
    
    if (success) setUserDetails(data);
  }

  if (isLoading) {
    return (<>Loading</>)
  }
  

  return (
    <>Account Details: {id}
      {JSON.stringify(userDetails)}
    </>
  );
}
export default AccountDetails;