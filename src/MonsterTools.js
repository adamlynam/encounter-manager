import monsterDescriptions from './data/descriptions/monster-descriptions.json';

const longestNumberRegex = new RegExp('[0-9]+');

function parseNumberFromListWithMatchingText(list, text) {
  if (list === undefined) {
    return undefined;
  }
  var match = list.split(',')
    .find(item => {
      return item.includes(text);
    });
  return match === undefined ? undefined : parseInt(
    longestNumberRegex.exec(match)[0]);
}

function parseGroundSpeed(monster) {
  var speeds = monster.speed.split(',');
  var groundSpeed = speeds[0];
  return groundSpeed === undefined ? undefined : parseInt(
    longestNumberRegex.exec(groundSpeed)[0]);
}

export function calculateModifier(value) {
  return Math.floor((value - 10) / 2);
}

export function parseMonsterAc(monster) {
  return parseInt(monster.ac.match(longestNumberRegex));
}

export function parseMonsterHealth(monster) {
  var exp = new RegExp('([0-9]*).*');
  return parseInt(monster.hp.match(exp)[1]);
}

export function parseMonsterSaves(monster) {
  return {
    str: parseNumberFromListWithMatchingText(monster.save, 'Str'),
    dex: parseNumberFromListWithMatchingText(monster.save, 'Dex'),
    con: parseNumberFromListWithMatchingText(monster.save, 'Con'),
    int: parseNumberFromListWithMatchingText(monster.save, 'Int'),
    wis: parseNumberFromListWithMatchingText(monster.save, 'Wis'),
    cha: parseNumberFromListWithMatchingText(monster.save, 'Cha'),
  }
}

export function parseMonsterSpeeds(monster) {
  return {
    groundSpeed: parseGroundSpeed(monster),
    burrowSpeed: parseNumberFromListWithMatchingText(monster.speed, 'burrow'),
    climbSpeed: parseNumberFromListWithMatchingText(monster.speed, 'climb'),
    flySpeed: parseNumberFromListWithMatchingText(monster.speed, 'fly'),
    swimSpeed: parseNumberFromListWithMatchingText(monster.speed, 'swim'),
  };
}

export function generateMonsterDescription(monster) {
  return monsterDescriptions.descriptions[Math.floor(Math.random() * monsterDescriptions.descriptions.length)]
}

export default {
  calculateModifier,
  parseMonsterAc,
  parseMonsterHealth,
  parseMonsterSaves,
  parseMonsterSpeeds,
  generateMonsterDescription,
}
