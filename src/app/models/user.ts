export class User {
    username: string;
    password: string;

    constructor(args: any) {
        this.username = args.username ?? "";
        this.password = args.password ?? "";
    }
}