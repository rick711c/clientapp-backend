import { IsUUID } from "class-validator";

export class AddUserRoleDto{
    @IsUUID()
    userId: string;

    @IsUUID()
    roleId: string;
}