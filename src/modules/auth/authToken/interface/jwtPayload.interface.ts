export interface JwtPayloadInterface {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    // createDate: string;
    // modifyDate: string;
    // isActive: number;
    // enPassword: string;
    roles: {
        roleId: string;
        name: string;
        description: string;
    }[];
}
