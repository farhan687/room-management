module.exports = {
  // Based on the window size, decide if the device is mobile or not
  isMobile() {
    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // True is returned if the device is mobile or tablet ( screen window < 960px)
    return width < 960;
  },
  getWindowHeight() {
    return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  },
};
