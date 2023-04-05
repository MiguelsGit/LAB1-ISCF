import { authGoogle } from '@/config/firebaseConfig';
import { signOut } from 'firebase/auth';

const logout = async () => {
  await signOut(authGoogle);
};

export default logout;