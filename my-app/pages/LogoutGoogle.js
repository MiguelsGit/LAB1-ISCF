import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { authGoogle } from '@/config/firebaseConfig';
import { signOut } from 'firebase/auth';

const LogoutGoogle = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authGoogle, (user) => {
      if (!user) {
        router.push('/'); // Redirect to the home page when the user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(authGoogle);
  };

  return (
    <div className={styles.container}>
      <h1>Logging Out...</h1>
      <button className={styles.button} onClick={handleLogout}>
        Confirm Logout
      </button>
      <Link href="/">
        <button className={styles.button}>Cancel Logout</button>
      </Link>
    </div>
  );
};

export default LogoutGoogle;
