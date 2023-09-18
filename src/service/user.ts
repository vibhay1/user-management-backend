import { where } from 'sequelize';
import User from '../model/user';
import bcrypt from 'bcrypt';
import { jwtOptions, jwtSign } from '../utils/jwt';

export const registerUser = async (payload: any) => {
    try {
        payload.hashedPassword = payload.password;
        delete payload.password;
        const response: any = await User.create(payload);
        return response;
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw ("Email already exist!")
        }
        throw (error.toString())
    }
}
export const login = async (payload: any) => {
    try {
        const response: any = await User.findOne({
            where: {
                email: payload.email
            }
        });
        if (response) {
            if (!bcrypt.compareSync(payload.password, response.hashedPassword)) {
                throw ("Inavlid email or password")
            }
            const toEncryptObj: any = { userId: response.id, userType: response.role }
            const token = jwtSign(toEncryptObj, { ...jwtOptions, expiresIn: '1h' });
            return {
                token,
                user: {
                    id: response.id,
                    name: response.name,
                    email: response.email,
                    userType: response.role
                }
            };
        }
        else {
            throw ("Inavlid email or password");
        }
    } catch (error: any) {
        throw (error.toString())
    }
}
export const getUser = async (payload: any) => {
    try {
        const response: any = await User.findOne({
            where: {
                id: payload.id
            },
            attributes: { exclude: ['hashedPassword', 'vCode'] },
        });
        return response;
    } catch (error: any) {
        throw (error.toString())
    }
}
export const getUserList = async (payload: any) => {
    try {
        const page: number = payload.page && payload.page > 0 ? payload.page : 1;
        const limit: number = payload.limit && payload.limit > 0 ? payload.limit : 10;
        const skip: number = (page - 1) * limit;
        const fQuery: any = {};
        const { count, rows }: { count: number, rows: any } = await User.findAndCountAll({
            where: fQuery,
            attributes: { exclude: ['hashedPassword', 'vCode'] },
            order: [['createdAt', 'DESC']],
            offset: skip,
            limit: limit
        });
        return {
            data: rows,
            total: count
        }
    } catch (error: any) {
        throw (error.toString())
    }
}
export const updateUserDetails = async (payload: any) => {
    try {
        const id: any = payload.id;
        return await User.update({ name: payload.name,role:payload.role }, { where: { id: id } });
    } catch (error: any) {
        throw (error.toString())
    }
}
export const deleteUser = async (payload: any) => {
    try {
        const id: any = payload.id;
        return await User.destroy({ where: { id: id } });
    } catch (error: any) {
        throw (error.toString())
    }
}