// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (request, index, newPresetArray) => {
  if(request === 'GET') {
    if(index >= 0 && index < presets.length) {
      return [200, presets[index]];
    } else {
      return [404, undefined];
    }
  } else if(request === 'PUT') {
    if(index >= 0 && index < presets.length) {
      presets[index] = newPresetArray;
      return [200, newPresetArray];
    } else {
      return [404, undefined];
    }
  } else {
    return [400, undefined];
  }
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
