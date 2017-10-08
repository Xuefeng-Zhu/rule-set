const Entity = require('./entity');

module.exports = class RuleSet {
  constructor() {
    this.entities = {};
    this.sources = {};
  }

  getEntityObj(entity) {
    let entityObj = this.entities[entity];

    if (!entityObj) {
      entityObj = new Entity(entity);
      this.entities[entity] = entityObj;
      this.sources[entity] = entityObj;
    }

    return entityObj;
  }

  addDep(entity0, entity1) {
    const entityObj0 = this.getEntityObj(entity0);
    const entityObj1 = this.getEntityObj(entity1);

    entityObj0.addDependence(entityObj1);
    entityObj1.addDependent(entityObj0);

    if (!entityObj1.getDependenceSet()[entity0]) {
      delete this.sources[entity1];
    }
  }

  addConflict(entity0, entity1) {
    const entityObj0 = this.getEntityObj(entity0);
    const entityObj1 = this.getEntityObj(entity1);

    entityObj0.addConflict(entityObj1);
    entityObj1.addConflict(entityObj0);
  }

  isCoherent() {
    for (const source of Object.keys(this.sources)) {
      const sourceObj = this.sources[source];
      const dependenceSet = sourceObj.getDependenceSet();
      const conflictSet = sourceObj.getConflictSet();

      for (const conflict of Object.keys(conflictSet)) {
        if (dependenceSet[conflict]) {
          return false;
        }
      }
    }

    return true;
  }
};
