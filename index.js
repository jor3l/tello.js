const Tello = require("./tello");

(() => {
  const tello = new Tello();
  tello.start(); // Connect to the tello and launch the UI.
})();
