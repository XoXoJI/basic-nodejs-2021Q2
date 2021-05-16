const { db } = require("../../lib/driver/dbDriver");
const BoardRepository = require("./board.memory.repository");
const CRUDService = require('../../lib/service/crudService');

class BoardService extends CRUDService {
    constructor() {
        super();

        this.repository = new BoardRepository(db);
    }
};

module.exports = new BoardService();
