class Controller {
  constructor(entities = []) {
    this.entities = entities;
  }

  fetchAll() {
    try {
      const entities = this.entities;
      // If there are no entities, return a message indicating this
      if (entities.length === 0) {
        return { status: "info", message: "No entities found", entities: [] };
      }
      // If there are entities, return them with a success status
      return {
        status: "success",
        message: "Entities successfully retrieved",
        entities,
      };
    } catch (error) {
      // Handle any other exceptions that may occur
      return { status: "error", message: `Unexpected error: ${error.message}` };
    }
  }

  getById(id) {
    try {
      const entity = this.entities.find(
        (entity) => String(id) === String(entity.id)
      );
      if (!entity) {
        // Return an error message instead of throwing an error
        return { status: "error", message: `Entity with id ${id} not found` };
      }
      // Return the found entity with a success status
      return {
        status: "success",
        message: `Entity with id ${id} successfully retrieved`,
        entity,
      };
    } catch (error) {
      return { status: "error", message: `Unexpected error: ${error.message}` };
    }
  }

  insert(entity) {
    try {
      this.entities.push(entity);

      return {
        status: "success",
        message: `Entity with id ${entity.id} was successfully inserted`,
      };
    } catch (error) {
      return {
        status: "error",
        message: `Unexpected error occurred: ${error.message}`,
      };
    }
  }

  clear(entityId) {
    try {
      const initialLength = this.entities.length;
      this.entities = this.entities.filter(
        (entity) => String(entity.id) !== String(entityId)
      );

      // Check if an entity was removed
      if (initialLength !== this.entities.length) {
        // Return success message if an entity was removed
        return {
          status: "success",
          message: `Entity with id ${entityId} was successfully removed.`,
        };
      } else {
        // Return error message if no entity was removed
        return {
          status: "error",
          message: `Entity with id ${entityId} not found.`,
        };
      }
    } catch (error) {
      // Handle any other exceptions that may occur
      return { status: "error", message: `Unexpected error: ${error.message}` };
    }
  }

  update(entity) {
    try {
      const index = this.entities.findIndex(
        (e) => String(e.id) === String(entity.id)
      );

      if (index === -1) {
        return {
          status: "error",
          message: `Entity with id ${entity.id} not found`,
        };
      }

      this.entities[index] = entity;

      return {
        status: "success",
        message: `Entity with id ${entity.id} was successfully updated`,
      };
    } catch (error) {
      // Handle any other exceptions that might occur
      return {
        status: "error",
        message: `Unexpected error occurred: ${error.message}`,
      };
    }
  }

  // Delete all entities
  clearAll() {
    try {
      this.entities = [];
      return {
        status: "success",
        message: "All entities were successfully removed",
      };
    } catch (error) {
      // Handle any other exceptions that might occur
      return {
        status: "error",
        message: `Unexpected error occurred: ${error.message}`,
      };
    }
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
