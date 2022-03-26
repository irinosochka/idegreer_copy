export interface IUser {
    username: string;
    _id: string;
    email: string;
    name: string;
    isRoleRequest: boolean;
    roles: Array<string>
}
