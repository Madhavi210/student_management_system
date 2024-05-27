import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string;
      userName: string;
      email: string;
      role: string;
    };
  }
}