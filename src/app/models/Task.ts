export class Task {
    public id: number;
    public title: string;
    public description: string;
    public status: boolean;
    public createdOn: Date;

    constructor(args: any) {
        this.id = args.Id ?? 0;
        this.title = args.Title ?? "";
        this.description = args.description ?? "";
        this.status = args.status ?? 1;
        this.createdOn = args.createdOn ?? Date.now;
    }
}