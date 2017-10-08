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

    entityObj0.addDependent(entityObj1);
    delete this.sources[entity1];
  }

  addConflict(entity0, entity1) {
    const entityObj0 = this.getEntityObj(entity0);
    const entityObj1 = this.getEntityObj(entity1);

    entityObj0.addConflict(entityObj1);
    entityObj1.addConflict(entityObj0);
  }

  isCoherent() {
    const sources = Object.keys(this.sources);
    for (let i = 0; i < sources.length; i++) {
      const sourceObj = this.sources[sources[i]];
      if (!sourceObj.isCoherent()) {
        return false;
      }
    }

    return true;
  }
};
