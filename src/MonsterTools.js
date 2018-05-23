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
  return parseInt(monster.hp.average, 10);
}

export function parseMonsterSaves(monster) {
  return {
    str: parseInt(monster.save.str, 10),
    dex: parseInt(monster.save.dex, 10),
    con: parseInt(monster.save.con, 10),
    int: parseInt(monster.save.int, 10),
    wis: parseInt(monster.save.wis, 10),
    cha: parseInt(monster.save.cha, 10),
  }
}

export function parseMonsterSkills(monster) {
  return {
    acrobatics: monster.skill && monster.skill.acrobatics ? parseInt(monster.skill.acrobatics, 10) : undefined,
    animalHandling: monster.skill && monster.skill['animal handling'] ? parseInt(monster.skill['animal handling'], 10) : undefined,
    arcana: monster.skill && monster.skill.arcana ? parseInt(monster.skill.arcana, 10) : undefined,
    athletics: monster.skill && monster.skill.athletics ? parseInt(monster.skill.athletics, 10) : undefined,
    deception: monster.skill && monster.skill.deception ? parseInt(monster.skill.deception, 10) : undefined,
    history: monster.skill && monster.skill.history ? parseInt(monster.skill.history, 10) : undefined,
    insight: monster.skill && monster.skill.insight ? parseInt(monster.skill.insight, 10) : undefined,
    intimidation: monster.skill && monster.skill.intimidation ? parseInt(monster.skill.intimidation, 10) : undefined,
    investigation: monster.skill && monster.skill.investigation ? parseInt(monster.skill.investigation, 10) : undefined,
    medicine: monster.skill && monster.skill.medicine ? parseInt(monster.skill.medicine, 10) : undefined,
    nature: monster.skill && monster.skill.nature ? parseInt(monster.skill.nature, 10) : undefined,
    perception: monster.skill && monster.skill.perception ? parseInt(monster.skill.perception, 10) : undefined,
    performance: monster.skill && monster.skill.performance ? parseInt(monster.skill.performance, 10) : undefined,
    persuasion: monster.skill && monster.skill.persuasion ? parseInt(monster.skill.persuasion, 10) : undefined,
    religion: monster.skill && monster.skill.religion ? parseInt(monster.skill.religion, 10) : undefined,
    sleightOfHand: monster.skill && monster.skill['sleight of hand'] ? parseInt(monster.skill['sleight of hand'], 10) : undefined,
    stealth: monster.skill && monster.skill.stealth ? parseInt(monster.skill.stealth, 10) : undefined,
    survival: monster.skill && monster.skill.survival ? parseInt(monster.skill.survival, 10) : undefined,
  }
}

export function parseMonsterSpeeds(monster) {
  return {
    groundSpeed: monster.speed.walk ? parseInt(monster.speed.walk, 10) : undefined,
    burrowSpeed: monster.speed.burrow ? parseInt(monster.speed.burrow, 10) : undefined,
    climbSpeed: monster.speed.climb ? parseInt(monster.speed.climb, 10) : undefined,
    flySpeed: monster.speed.fly ? parseInt(monster.speed.fly, 10) : undefined,
    swimSpeed: monster.speed.swim ? parseInt(monster.speed.swim, 10) : undefined,
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
  parseMonsterSkills,
  parseMonsterSpeeds,
  generateMonsterDescription,
}
