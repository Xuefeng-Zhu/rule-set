module.exports = class Entity {
  constructor(name) {
    this.name = name;
    this.dependents = {};
    this.conflicts = {};
  }

  addDependent(dependent) {
    this.dependents[dependent.name] = dependent;
  }

  addConflict(conflict) {
    this.conflicts[conflict.name] = conflict;
  }

  isCoherent() {
    const dependentSet = this.getDependentSet();
    const conflictSet = this.getConflictSet();
    const conflicts = Object.keys(conflictSet);

    for (let i = 0; i < conflicts.length; i++) {
      if (dependentSet[conflicts[i]]) {
        return false;
      }
    }

    return true;
  }

  getDependentSet() {
    const dependentSet = Object.assign({}, this.dependents);

    Object.values(this.dependents).forEach((dependent) => {
      Object.assign(dependentSet, dependent.getDependentSet());
    });

    return dependentSet;
  }

  getConflictSet() {
    const conflictSet = Object.assign({}, this.conflicts);

    Object.values(this.dependents).forEach((dependent) => {
      Object.assign(conflictSet, dependent.getConflictSet());
    });

    return conflictSet;
  }
};
