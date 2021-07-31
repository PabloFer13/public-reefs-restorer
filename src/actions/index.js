import levelActions from './level';

const setTypeCreator = (actionPrefix) => (actionType) => `${actionPrefix}/${actionType}`;
const actionCreator = (type) => (payload) => ({ type, payload });

const actionBundles = [
  { name: 'level', bundle: levelActions },
];

const actions = actionBundles.reduce((acc, it) => {
  const typeCreator = setTypeCreator(it.bundle.prefix);
  const actions = it.bundle.types.reduce((acts, tp) => {
    const type = typeCreator(tp.type);
    const action = actionCreator(type);
    action.type = type;

    return { ...acts, [tp.name]: action };
  }, {});

  return ({ ...acc, [it.name]: { ...actions }});
}, {});

export default actions;
