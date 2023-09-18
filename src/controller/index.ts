import { deleteUser, getUser, getUserList, login, registerUser, updateUserDetails } from '../service/user';
import { Router, Request, Response } from 'express'
import { APIError, APISuccess, APISuccessWithData } from '../utils/APIHandler';
import { isLogged, onlyAdminAllowed } from '../middleware/authenticate';

const userRouter = Router();


userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const reqPayload: any = req.body;
        delete reqPayload.role;
        const response: any = await registerUser(reqPayload);
        return APISuccess(res, "User register successfully")
    } catch (error: any) {
        return APIError(res, error.toString());
    }
})
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const reqPayload: any = req.body;
        const response: any = await login(reqPayload);
        return APISuccessWithData(res, "success", response)
    } catch (error: any) {
        return APIError(res, error.toString());
    }
})
userRouter.post('/addUser', [isLogged, onlyAdminAllowed], async (req: Request, res: Response) => {
    try {
        const reqPayload: any = req.body;
        const response: any = await registerUser(reqPayload);
        return APISuccess(res, "User has been added successfully")
    } catch (error: any) {
        return APIError(res, error.toString());
    }
})
userRouter.get('/get/:id', isLogged, async (req: Request, res: Response) => {
    try {
        const reqPayload: any = { id: req.params.id };
        const response: any = await getUser(reqPayload);
        return APISuccessWithData(res, "success", response)
    } catch (error: any) {
        return APIError(res, error.toString());
    }
})
userRouter.get('/list/:limit?/:page?', isLogged, async (req: Request, res: Response) => {
    try {
        const reqPayload: any = { page: req.params.page ? Number(req.params.page) : 0, limit: req.params.limit ? Number(req.params.limit) : 0 };
        const response: any = await getUserList(reqPayload);
        return APISuccessWithData(res, "success", response)
    } catch (error: any) {
        return APIError(res, error.toString());
    }
})
userRouter.put('/update', [isLogged, onlyAdminAllowed], async (req: Request, res: Response) => {
    try {
        const reqPayload: any = req.body;
        const response: any = await updateUserDetails(reqPayload);
        return APISuccess(res, "success")
    } catch (error: any) {
        return APIError(res, error.toString());
    }
})
userRouter.delete('/delete', [isLogged, onlyAdminAllowed], async (req: Request, res: Response) => {
    try {
        const reqPayload: any = req.body;
        const response: any = await deleteUser(reqPayload);
        return APISuccess(res, "success")
    } catch (error: any) {
        return APIError(res, error.toString());
    }
})

export default userRouter;