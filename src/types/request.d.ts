import { User } from 'src/end-user/entities/user.entity'; 
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
