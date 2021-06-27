import UserRepository from "./user.memory.repository";
import CRUDService from "../../lib/service/crudService";


export const userService = new CRUDService(new UserRepository());
