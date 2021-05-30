import { db } from "../../lib/driver/dbDriver";
import BoardRepository from "./board.memory.repository.js";
import CRUDService from '../../lib/service/crudService';

class BoardService extends CRUDService {
    constructor() {
        super();

        this.repository = new BoardRepository(db);
    }
};

export const boardService =  new BoardService();
