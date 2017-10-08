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
  ruleSet.isCoherent();
}

function toggle() {

}

module.exports = {
  makeRelationshipSet,
  dependsOn,
  areExclusive,
  checkRelationships,
  toggle
};
