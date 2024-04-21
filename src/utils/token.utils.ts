import jwt from 'jsonwebtoken';
import { User } from 'src/types/user.types';

export class Token {

    private readonly SECRET_KEY: string = process.env.SECRET_KEY!;

    public generate(user: User): string {
        const payload = {
          email: user.email,
          isAdmin: user.isAdmin
        };
      
        return jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
    }

    public verify(token: string): boolean {
        try {
            jwt.verify(token, this.SECRET_KEY);
            console.log(jwt.verify(token, this.SECRET_KEY));
            return true;
        } catch {
            return false;
        }
    }

}