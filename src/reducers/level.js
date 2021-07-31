import appActions from "actions";

const { level } = appActions;

const initialState = {
  progress: 0,
  threshold: 0,
  cleaningCost: [],
  huntCost: [],
  healthCost: [],
  cleaningProgress: 0,
  huntProgress: 0,
  healthProgress: 0,
  resources: {
    pearls: 0,
    gold: 0,
    rocks: 0,
    wood: 0
  }
}

function reducer ( state = initialState, { type, payload }){
  const { resources } = state;
  switch(type){
    case level.setResources.type:
      return { ...state, resources: { ...payload } };
    case level.setPearls.type:
      return { ...state, resources: { ...resources, pearls: payload } };
    case level.setGold.type:
      return { ...state, resources: { ...resources, gold: payload } };
    case level.setRocks.type:
      return { ...state, resources: { ...resources, rocks: payload } };
    case level.setWood.type:
      return { ...state, resources: { ...resources, wood: payload } };
    case level.setProgress.type:
      return { ...state, progress: payload };
    case level.setThreshold.type:
      return { ...state, setThreshold: payload };
    case level.setLevelDetails.type:
      return { ...state, ...payload };
    case level.setCleaningProgress.type:
      return { ...state, cleaningProgress: payload};
    case level.setHuntProgress.type:
      return { ...state, huntProgress: payload};
    case level.setHealthProgress.type:
      return { ...state, healthProgress: payload};
    case level.setCleaningCost.type:
      return { ...state, cleaningCost: payload};
    case level.setHuntCost.type:
      return { ...state, huntCost: payload};
    case level.setHealthCost.type:
      return { ...state, healthCost: payload};
    default:
      return state;
  }
}

export default reducer;
