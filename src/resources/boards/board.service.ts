import { db } from "../../lib/driver/dbDriver";
import CRUDService from "../../lib/service/crudService";
import BoardRepository from "./board.memory.repository";

export const boardService = new CRUDService(new BoardRepository(db));
