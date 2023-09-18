import * as jwt from "jsonwebtoken";
const JWT_SECRET: any = process.env.JWT_SECRET;
const jwtOptions: any = {
    issuer: "VK",
    subject: "_toGrantAccess",
    audience: "User",
    algorithm: 'HS256'
}
const jwtVerify = (token: string, jwtOption: any) => jwt.verify(token, JWT_SECRET, jwtOption);
const jwtSign = (data: any, jwtOption: any) => jwt.sign(data, JWT_SECRET, jwtOption);
export { jwtOptions, jwtVerify, jwtSign }