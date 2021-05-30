import Model from '../../lib/model';

class User extends Model {
    name: string;
    login: string;
    password: string;

    constructor({
        id = undefined,
        name = 'USER',
        login = 'user',
        password = 'P@55w0rd',
    } = {}) {
        super({ id });

        this.name = name;
        this.login = login;
        this.password = password;
    }

    static toResponse(user: User) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}

export default User;