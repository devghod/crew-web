const isDark = () => {
  const savedMode = localStorage.getItem('darkMode');
  return savedMode === 'dark';
};

const setIsDark = (mode: boolean) => {
  localStorage.setItem('darkMode', mode ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', mode);
};

export { isDark, setIsDark };
