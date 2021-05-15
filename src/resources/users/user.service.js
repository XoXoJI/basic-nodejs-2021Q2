const { db } = require("../../lib/driver/dbDriver");
const UserRepository = require("./user.memory.repository");
const User = require("./user.model");
const CRUDService = require("../../lib/service/crudService");

class UserService extends CRUDService {
    constructor() {
        super();

        this.repository = new UserRepository(db);
    }
};

module.exports = new UserService();
