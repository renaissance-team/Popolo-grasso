const setAppHeightStyleProperty = () => {
  document.documentElement.style.setProperty('--app-height', `${window.visualViewport.height}px`);
};

export default setAppHeightStyleProperty;
