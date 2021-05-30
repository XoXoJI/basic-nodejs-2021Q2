import { db } from "../../lib/driver/dbDriver";
import UserRepository from "./user.memory.repository.js";
import CRUDService from "../../lib/service/crudService";


export const userService = new CRUDService(new UserRepository(db));
