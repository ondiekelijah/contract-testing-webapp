class Controller {
    constructor(entities = []) {
      this.entities = entities;
    }
  
    fetchAll() {
      return this.entities;
    }
  
    getById(id) {
      const entity = this.entities.find((entity) => id === entity.id);
      if (!entity) {
        throw new Error(`Entity with id ${id} not found`);
      }
      return entity;
    }
  
    insert(entity) {
      this.entities.push(entity);
    }
  
    clear(entityId) {
      const initialLength = this.entities.length;
      this.entities = this.entities.filter(
        (entity) => entity.id !== entityId
      );
      return initialLength !== this.entities.length;
    }
  
    update(entity) {
      const index = this.entities.findIndex((e) => e.id === entity.id);
      if (index === -1) {
        throw new Error(`Entity with id ${entity.id} not found`);
      }
      this.entities[index] = entity;
    }
  
    getNextId() {
      return this.entities.length + 1;
    }
  
    sortBy(property) {
      this.entities.sort((a, b) =>
        a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
      );
    }
  }
  
  module.exports = Controller;
  