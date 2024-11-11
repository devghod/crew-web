import { CloseIcon } from '../../utils/icons';
import AccountForm from './AccountForm';

type TAccountModal = {
  handleModal: () => void;
};

const AccountModal = (props: TAccountModal) => {
  const { handleModal } = props;

  return (
    <div className='relative z-20 transition ease-in-out duration-300'>
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen'>
        <div className='absolute'>
          <div className='bg-white dark:bg-gray-800 rounded-lg w-full'>
            <div className='grid grid-cols-6 gap-4 text-slate-700 dark:text-slate-300 border-b dark:border-gray-700 p-2'>
              <div className='font-semibold'>Create Account</div>
              <div className='col-end-7 justify-self-end justify-center content-center'>
                <button
                  onClick={handleModal}
                  className='text-rose-500 bg-rose-500/20 hover:bg-rose-500/30 rounded-full p-1'
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <AccountForm type='create' handleModal={handleModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
