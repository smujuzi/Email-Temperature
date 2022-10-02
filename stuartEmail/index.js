const temperature = require("./temperature");
const email = require("./email");

exports.handler = async (event) => {
  const tempKampala = await temperature.getTemperatureInDegrees(
    getLocationOne()
  );
  const tempLondon = await temperature.getTemperatureInDegrees(
    getLocationTwo()
  );

  if (tempLondon > tempKampala) {
    await email.sendCelebrationEmail(tempKampala, tempLondon);
  }

  function getLocationOne() {
    return "Kampala";
  }

  function getLocationTwo() {
    return "London";
  }
};
