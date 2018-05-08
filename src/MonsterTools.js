import monsterDescriptions from './data/descriptions/monster-descriptions.json';

const longestNumberRegex = new RegExp('[0-9]+');
const xpCrLookup = new Map();
xpCrLookup.set('0', 10);
xpCrLookup.set('1/8', 25);
xpCrLookup.set('1/4', 50);
xpCrLookup.set('1/2', 100);
xpCrLookup.set('1', 200);
xpCrLookup.set('2', 450);
xpCrLookup.set('3', 700);
xpCrLookup.set('4', 1100);
xpCrLookup.set('5', 1800);
xpCrLookup.set('6', 2300);
xpCrLookup.set('7', 2900);
xpCrLookup.set('8', 3900);
xpCrLookup.set('9', 5000);
xpCrLookup.set('10', 5900);
xpCrLookup.set('11', 7200);
xpCrLookup.set('12', 8400);
xpCrLookup.set('13', 10000);
xpCrLookup.set('14', 11500);
xpCrLookup.set('15', 13000);
xpCrLookup.set('16', 15000);
xpCrLookup.set('17', 18000);
xpCrLookup.set('18', 20000);
xpCrLookup.set('19', 22000);
xpCrLookup.set('20', 25000);
xpCrLookup.set('21', 33000);
xpCrLookup.set('22', 41000);
xpCrLookup.set('23', 50000);
xpCrLookup.set('24', 62000);
xpCrLookup.set('25', 75000);
xpCrLookup.set('26', 90000);
xpCrLookup.set('27', 105000);
xpCrLookup.set('28', 120000);
xpCrLookup.set('29', 135000);
xpCrLookup.set('30', 155000);

function parseNumberFromListWithMatchingText(list, text) {
  if (list === undefined) {
    return undefined;
  }
  var match = list.split(',')
    .find(item => {
      return item.includes(text);
    });
  return match === undefined ? undefined : parseInt(longestNumberRegex.exec(match)[0], 10);
}

function parseGroundSpeed(monster) {
  var speeds = monster.speed.split(',');
  var groundSpeed = speeds[0];
  return groundSpeed === undefined ? undefined : parseInt(longestNumberRegex.exec(groundSpeed)[0], 10);
}

export function calculateModifier(value) {
  return Math.floor((value - 10) / 2);
}

export function parseMonsterCr(monster) {
  if (typeof monster.cr === 'string' || monster.cr instanceof String) {
    return monster.cr;
  }
  else {
    return monster.cr.cr;
  }
}

function calculateXPFromCR(cr) {
  if (xpCrLookup.has(cr)) {
    return xpCrLookup.get(cr);
  }
  return 0;
}

export function parseMonsterXp(monster) {
  return calculateXPFromCR(parseMonsterCr(monster));
}

export function parseMonsterAc(monster) {
  return parseInt(monster.ac.match(longestNumberRegex), 10);
}

export function parseMonsterSize(monster) {
  switch (monster.size) {
    case 'T':
      return 'tiny';
    case 'S':
      return 'small';
    case 'M':
      return 'medium';
    case 'L':
      return 'large';
    case 'H':
      return 'huge';
    case 'G':
      return 'gargantuan';
    default:
      return 'meduim';
  }
}

export function parseMonsterHealth(monster) {
  var exp = new RegExp('([0-9]*).*');
  return parseInt(monster.hp.match(exp)[1], 10);
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
  parseMonsterCr,
  parseMonsterXp,
  parseMonsterAc,
  parseMonsterSize,
  parseMonsterHealth,
  parseMonsterSaves,
  parseMonsterSpeeds,
  generateMonsterDescription,
}
