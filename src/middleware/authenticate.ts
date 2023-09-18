import User from '../model/user';
import { Request, Response, NextFunction } from 'express'
import { APIUnauthrized } from '../utils/APIHandler';
import { jwtOptions, jwtVerify } from '../utils/jwt';

const isLogged = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: any;
        if (req.headers && req.headers.authorization) {
            var parts = req.headers.authorization.split(' ');
            if (parts.length == 2) {
                var scheme = parts[0],
                    credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                }
            } else {
                return APIUnauthrized(res, "Authorization required")
            }
        } else if (req.query.access_token) {
            token = req.query.access_token;
            // We delete the token from param to not mess with blueprints
            delete req.query.access_token;
        } else {
            return APIUnauthrized(res, "Authorization required")
        }
        const decrypted_token: any = jwtVerify(token, { ...jwtOptions });
        if (decrypted_token) {
            try {
                const filterQ = {
                    where: {
                        id: decrypted_token.userId,
                        role: decrypted_token.userType
                    }
                }
                const userData: any = await User.findOne(filterQ);
                if (!userData) {
                    return APIUnauthrized(res, "Invalid User");
                } else {
                    req.body.identity = {
                        id: userData.id,
                        role: userData.role

                    }
                    next();
                }

            } catch (error) {
                return APIUnauthrized(res, "Authorization Error " + error);
            }
        } else {
            return APIUnauthrized(res, "Your Session Has Expired. Please login again ");
        }


    } catch (error) {
        return APIUnauthrized(res, "Authorization, Invalid User");
    }
}
const onlyAdminAllowed = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.identity.role === 'admin') {
        next();
    } else {
        return APIUnauthrized(res, "You are not authorized to access this resource");
    }
}
export {
    isLogged, onlyAdminAllowed
}