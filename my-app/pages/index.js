import Link from 'next/link'; // Next.js component for client-side navigation
import styles from '@/styles/Home.module.css'; // CSS styles for this component
import { onAuthStateChanged } from 'firebase/auth'; // Firebase authentication listener
import { useState, useEffect } from 'react'; // React hooks for managing component state
import { authGoogle } from '@/config/firebaseConfig'; // Firebase authentication configuration

function HomePage() {
  const [user, setUser] = useState(null); // Declare a state variable for the user's authentication status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authGoogle, (user) => {
      setUser(user); // Set the user state based on the current authentication status
    });
    return () => {
      unsubscribe(); // Unsubscribe from the authentication listener when the component unmounts
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>Welcome to the Coppelia Dashboard!</h1>
      <div className={styles.buttons}>
        <Link href="http://localhost:3000/IntervalController">
          <button className={styles.button}>Dashboard</button>
        </Link>
        {user ? (
          <Link href="/LogoutGoogle">
            <button className={styles.button}>Logout</button>
          </Link>
        ) : (
          <Link href="/LoginGoogle">
            <button className={styles.button}>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;
