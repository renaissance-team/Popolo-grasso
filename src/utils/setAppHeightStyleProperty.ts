const setAppHeightStyleProperty = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--app-height', `${window.visualViewport.height}px`);
  }
};

export default setAppHeightStyleProperty;
