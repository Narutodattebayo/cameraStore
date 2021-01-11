

import { AdminV1 } from "../entity/v1/admin.v1.entity";




export const createAdmin = function (admins: { name: string, email: string }[]): boolean {
    admins.forEach(async (admin) => {
        let checkAdminExists = await AdminV1.findOne({ email: admin.email });
        if (!checkAdminExists) {
            await AdminV1.createAdmin({
                email: admin.email,
                name: admin.name,
            });
        }
    });
    return true;
}