export const prefix = 'reefsGame/level';

export const types = [
  { name: 'doCleaning', type: 'DO_CLEANING' },
  { name: 'doHunt', type: 'DO_HUNT' },
  { name: 'doHealth', type: 'DO_HEALTH' },
  { name: 'setResources', type: 'SET_RESOURCES' },
  { name: 'setPearls', type: 'SET_PEARLS' },
  { name: 'setGold', type: 'SET_GOLD' },
  { name: 'setRocks', type: 'SET_ROCKS' },
  { name: 'setWood', type: 'SET_WOOD' },
  { name: 'setProgress', type: 'SET_PROGRESS' },
  { name: 'setThreshold', type: 'SET_THRESHOLD' },
  { name: 'setLevelDetails', type: 'SET_LEVEL_DETAILS' },
  { name: 'setCleaningProgress', type: 'SET_CLEANING_PROGRESS' },
  { name: 'setHuntProgress', type: 'SET_HUNT_PROGRESS' },
  { name: 'setHealthProgress', type: 'SET_HEALTH_PROGRESS' },
  { name: 'setCleaningCost', type: 'SET_CLEANING_COST' },
  { name: 'setHuntCost', type: 'SET_HUNT_COST' },
  { name: 'setHealthCost', type: 'SET_HEALTH_COST' },
  { name: 'getUserResources', type: 'GET_USER_RESOURCES' },
  { name: 'getLevelDetails', type: 'GET_LEVEL_DETAILS' }
];

const levelBundle = { prefix, types };

export default levelBundle;
