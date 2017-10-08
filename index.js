const RuleSet = require('./src/rule-set');

function makeRelationshipSet() {
  return new RuleSet();
}

function dependsOn(entity0, entity1, ruleSet) {
  ruleSet.addDep(entity0, entity1);
  return ruleSet;
}

function areExclusive(entity0, entity1, ruleSet) {
  ruleSet.addConflict(entity0, entity1);
  return ruleSet;
}

function checkRelationships(ruleSet) {
  return ruleSet.isCoherent();
}

function deselect(selected, entity, ruleSet) {
  const result = Object.assign({}, selected);
  const entityObg = ruleSet.getEntityObj(entity);

  delete result[entity];
  Object.keys(entityObg.getDependentSet()).forEach((dependent) => {
    delete result[dependent];
  });

  return result;
}

function select(selected, entity, ruleSet) {
  let result = Object.assign({}, selected);
  const entityObg = ruleSet.getEntityObj(entity);

  result[entity] = true;
  Object.keys(entityObg.getDependenceSet()).forEach((dependent) => {
    result[dependent] = true;
  });

  Object.keys(entityObg.getConflictSet()).forEach((conflict) => {
    result = deselect(result, conflict, ruleSet);
  });

  return result;
}

function toggle(selected, entity, ruleSet) {
  const handler = selected[entity] ? deselect : select;

  return handler(selected, entity, ruleSet);
}

module.exports = {
  makeRelationshipSet,
  dependsOn,
  areExclusive,
  checkRelationships,
  toggle,
};
