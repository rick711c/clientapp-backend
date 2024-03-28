import { UUID } from "crypto";

//from the currentUser () decorator , we will recive userInfo, which is same as an object of this class.
export interface CurrentUserInfo {
    userId: UUID;
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