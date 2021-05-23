const { db } = require("../../lib/driver/dbDriver");
const UserRepository = require("./user.memory.repository");
const CRUDService = require("../../lib/service/crudService");

class UserService extends CRUDService {
    constructor() {
        super();

        this.repository = new UserRepository(db);
    }
};

module.exports = new UserService();
