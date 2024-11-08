import { useEffect, useState } from 'react';
import { DarkIcon, LightIcon } from '../../utils/icons';
import { isDark, setIsDark } from '../../utils/darkMode';

const LightSwitch = () => {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => setIsOn(isDark), []);

  function handleSwitch() {
    setIsOn(!isOn);
    setIsDark(!isOn);
  }

  return (
    <div
      onClick={handleSwitch}
      className='relative flex bg-violet-500 rounded-full p-1 cursor-pointer transition-all duration-500 flex items-center'
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full transform transition-transform duration-500 
          ${isOn ? 'translate-x-0' : 'translate-x-6'}
        `}
      />

      <div className='flex w-full space-x-2 justify-between p-1 z-10'>
        <div className={`${!isOn && 'text-yellow-400'}`}>
          <LightIcon />
        </div>

        <div className={`${!isOn && 'text-violet-700'}`}>
          <DarkIcon />
        </div>
      </div>
    </div>
  );
};

export default LightSwitch;
