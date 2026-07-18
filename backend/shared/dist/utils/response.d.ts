import type { Response } from "express";
interface responsetype {
    success: boolean;
    message: string;
    payload?: any;
}
declare const success: (res: Response<responsetype>, message: string, data?: any) => Response<responsetype, Record<string, any>>;
declare const err: (res: Response<responsetype>, message: string) => Response<responsetype, Record<string, any>>;
export { success, err };
