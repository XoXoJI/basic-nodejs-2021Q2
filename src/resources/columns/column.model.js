const uuid = require('uuid').v4;

class Column {
  constructor({
    id = uuid(),
    title = 'title',
    order = 1,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(board) {
    const { id, title, order } = board;
    return { id, title, order };
  }
}

module.exports = Column;
