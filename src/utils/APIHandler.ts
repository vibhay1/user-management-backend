export const APISuccessWithData: any = (res: any, message: any, data: any, total = null) => {
    return res.status(200).json({ success: true, code: 200, message: message, ...total != null && { total: total }, data: data });
};
export const APISuccess: any = (res: any, message: any) => {
    return res.status(200).json({ "success": true, code: 200, message: message });
};
export const APIError: any = (res: any, message: any) => {
    return res.status(200).json({ "success": false, code: 400, message: message });
};
export const APIDataNotFound: any = (res: any, message: any) => {
    return res.status(200).json({ "success": false, code: 404, message: message });
};
export const APIUnauthrized: any = (res: any, message: any) => {
    return res.status(401).json({ "success": false, code: 401, message: message });
}
