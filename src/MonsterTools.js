const longestNumberRegex = new RegExp('[0-9]+');

export function parseMonsterAc(monster) {
  return parseInt(monster.ac.match(longestNumberRegex));
}

export function parseMonsterHealth(monster) {
  var exp = new RegExp('([0-9]*).*');
  return parseInt(monster.hp.match(exp)[1]);
}

export function parseMonsterSpeeds(monster) {
  return {
    groundSpeed: parseGroundSpeed(monster),
    burrowSpeed: parseBurrowSpeed(monster),
    climbSpeed: parseClimbSpeed(monster),
    flySpeed: parseFlySpeed(monster),
    swimSpeed: parseSwimSpeed(monster),
  };
}

function parseGroundSpeed(monster) {
  var speeds = monster.speed.split(',');
  var groundSpeed = speeds[0];
  return groundSpeed === undefined ? undefined : parseInt(
    longestNumberRegex.exec(groundSpeed)[0]);
}

function parseSpeedWithText(monster, text) {
  var speed = monster.speed.split(',')
    .find(speed => {
      return speed.includes(text);
    });
  return speed === undefined ? undefined : parseInt(
    longestNumberRegex.exec(speed)[0]);
}

function parseFlySpeed(monster) {
  return parseSpeedWithText(monster, 'fly');
}

function parseSwimSpeed(monster) {
  return parseSpeedWithText(monster, 'swim');
}

function parseClimbSpeed(monster) {
  return parseSpeedWithText(monster, 'climb');
}

function parseBurrowSpeed(monster) {
  return parseSpeedWithText(monster, 'burrow');
}

export default {
  parseMonsterAc,
  parseMonsterHealth,
  parseMonsterSpeeds,
}
