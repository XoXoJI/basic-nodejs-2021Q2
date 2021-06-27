interface ITokenData {
    userId: string,
    token: string
}


export class LoginRepository {
    private static instance: LoginRepository;
    private data: ITokenData[] = [];

    constructor() {
        if (LoginRepository.instance) {
            return LoginRepository.instance;
        }

        LoginRepository.instance = this;
    }

    create(userId: string, token: string) {
        const tokenData = { userId, token };

        this.data.push(tokenData);

        return tokenData;
    }

    get(userId: string) {
        const tokenData = this.data.find(
            (tokenData) => tokenData.userId === userId
        );

        return tokenData;
    }

    update(userId: string, token: string) {
        const tokenData = this.data.find(
            (tokenData) => tokenData.userId === userId
        );

        if (!tokenData) {
            throw new Error('token missed');
        }

        tokenData.token = token;

        return tokenData
    }

    delete(userId: string) {
        const tokenData = this.data.find(
            (tokenData) => tokenData.userId === userId
        );
        const index = this.data.findIndex(
            (tokenData) => tokenData.userId === userId
        );

        this.data.splice(index, 1);

        return tokenData;
    }
}
