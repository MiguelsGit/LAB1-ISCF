import { authGoogle } from '@/config/firebaseConfig';
import { signOut } from 'firebase/auth';

export const logout = async () => {
  await signOut(authGoogle);
};