const isDark = () => {
  const savedMode = localStorage.getItem('darkMode');
  return savedMode === 'true';
};

const setIsDark = (mode: boolean) => {
  localStorage.setItem('darkMode', mode ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', !mode);
};

export { isDark, setIsDark };
