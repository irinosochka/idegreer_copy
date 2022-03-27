export interface IUser {
    username: string;
    _id: string;
    email: string;
    name: string;
    isRoleRequest: boolean;
    image: { path: string } | null;
    roles: Array<string>
}
