module.exports = class Entity {
  constructor(name) {
    this.name = name;
    this.dependents = {};
    this.dependencies = {};
    this.conflicts = {};
  }

  addDependent(dependentObj) {
    this.dependents[dependentObj.name] = dependentObj;
  }

  addDependence(dependenceObj) {
    this.dependencies[dependenceObj.name] = dependenceObj;
  }

  addConflict(conflictObj) {
    this.conflicts[conflictObj.name] = conflictObj;
  }

  getDependenceSet() {
    return this.getEntitySet('dependencies');
  }

  getDependentSet() {
    return this.getEntitySet('dependents', 'dependents');
  }

  getConflictSet() {
    return this.getEntitySet('conflicts');
  }

  getEntitySet(type, interator = 'dependencies') {
    if (this.visited) return {};

    this.visited = true;
    const result = Object.assign({}, this[type]);

    for (const item of Object.keys(this[interator])) {
      Object.assign(result, this[interator][item].getEntitySet(type));
    }

    this.visited = false;
    return result;
  }
};
