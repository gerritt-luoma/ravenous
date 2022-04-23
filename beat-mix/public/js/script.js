// Drum Arrays
let kicks = Array(16).fill(false);
let snares = Array(16).fill(false);
let hiHats = Array(16).fill(false);
let rideCymbals = Array(16).fill(false);

function toggleDrum(type, index) {
  console.log(`Type: ${type}, Index: ${index}`)
  if(index < 0 || index > 15) {
    console.log(`ERROR: index ${index} is out of range`);
    return null;
  }
  switch(type) {
    case 'kicks':
      kicks[index] = !kicks[index];
      break;
    case 'snares':
      snares[index] = !kicks[index];
      break;
    case 'hiHats':
      hiHats[index] = !hiHats[index];
      break;
    case 'rideCymbals':
      rideCymbals[index] = !rideCymbals[index];
      break;
    default:
      console.log(`ERROR: ${type} is not valid`);
      break;
  }
}

function clear(type) {
  switch(type) {
    case 'kicks':
      kicks.fill(false);
      break;
    case 'snares':
      snares.fill(false);
      break;
    case 'hiHats':
      hiHats.fill(false);
      break;
    case 'rideCymbals':
      rideCymbals.fill(false);
      break;
    default:
      console.log(`ERROR: ${type} is not valid`);
      break;
  }
}

function invert(type) {
  switch(type) {
    case 'kicks':
      kicks.forEach((element, index) => {
        kicks[index] = !element;
      });
      break;
    case 'snares':
      snares.forEach((element, index) => {
        snares[index] = !element;
      });
      break;
    case 'hiHats':
      hiHats.forEach((element, index) => {
        hiHats[index] = !element;
      });
      break;
    case 'rideCymbals':
      rideCymbals.forEach((element, index) => {
        rideCymbals[index] = !element;
      });
      break;
    default:
      console.log(`ERROR: ${type} is not valid`);
      break;
  }
}