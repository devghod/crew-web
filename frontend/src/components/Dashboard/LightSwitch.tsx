import { useEffect, useState } from 'react';
import { DarkIcon, LightIcon } from '../../utils/icons';
import { isDark, setIsDark } from '../../utils/darkMode';

const LightSwitch = () => {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => setDark(isDark()), []);

  function handleSwitch() {
    setDark(!dark);
    setIsDark(!dark);
  }

  return (
    <div
      onClick={handleSwitch}
      className='relative flex bg-violet-500 rounded-full p-1 cursor-pointer transition-all duration-500 flex items-center'
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full transform transition-transform duration-500 
          ${!dark ? 'translate-x-0' : 'translate-x-6'}
        `}
      />

      <div className='flex w-full space-x-2 justify-between p-1 z-10'>
        <div className={`${dark && 'text-yellow-400'}`}>
          <LightIcon />
        </div>

        <div className={`${dark && 'text-violet-700'}`}>
          <DarkIcon />
        </div>
      </div>
    </div>
  );
};

export default LightSwitch;
