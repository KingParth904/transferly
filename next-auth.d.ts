
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';



declare module 'next-auth' {

  interface User {
    id: string;
    username: string;
  }

 
  interface Session {
    user: {
      id: string;
      name?: string | null; 
    } & DefaultSession['user']; 
  }
}

declare module 'next-auth/jwt' {
  
  interface JWT {
    id: string;
    name?: string | null; 
  }
}
