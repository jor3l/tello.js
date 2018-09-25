const Tello = require("./dist/tello").default;

(async () => {
  const tello = new Tello();

  try {
    await tello.start();
    await tello.sleep(1000);
    await tello.write("takeoff");
    await tello.sleep(5000);
    await tello.write("land");

    process.exit();
  } catch (error) {
    console.log("Error!", error);
  }
})();
