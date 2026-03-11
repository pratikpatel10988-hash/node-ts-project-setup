import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';
import { AppError } from '../middlewares/errorHandler.middleware';

export class UserController {
  static async getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
         throw new Error('User not found');
      }

      const user = await UserService.getUserById(req.user.id);

      if (!user) {
        throw new Error('User not found');
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      const err = new Error(error.message) as AppError;
      err.statusCode = 404;
      next(err);
    }
  }
}
