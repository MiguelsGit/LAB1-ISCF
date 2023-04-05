// Import necessary modules and components
import Link from 'next/link'; // Next.js component for client-side navigation
import styles from '@/styles/Home.module.css'; // CSS styles for this component
import { onAuthStateChanged } from 'firebase/auth'; // Firebase authentication listener
import { useState, useEffect } from 'react'; // React hooks for managing component state
import { logout } from '../pages/LogoutGoogle'; // Function for logging out of Google account
import { authGoogle } from '@/config/firebaseConfig'; // Firebase authentication configuration

function HomePage() {
  // Declare a state variable for the user's authentication status
  const [user, setUser] = useState(null);

  // Add a Firebase authentication listener when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authGoogle, (user) => {
      setUser(user); // Set the user state based on the current authentication status
    });
    return () => {
      unsubscribe(); // Unsubscribe from the authentication listener when the component unmounts
    };
  }, []);

  // Define a function for handling the logout button click event
  const handleLogout = async () => {
    await logout(); // Call the logout function to log the user out of their Google account
  };

  // Render the component's UI
  return (
    <div className={styles.container}>
      <h1>Welcome to the Coppelia Dashboard!</h1>
      <div className={styles.buttons}>
        {/* Add a navigation link to the IntervalController page */}
        <Link href="http://localhost:3000/IntervalController">
          <button className={styles.button}>Dashboard</button>
        </Link>
        {/* Conditionally render a Logout button or a Login button based on the user state */}
        {user ? (
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link href="/LoginGoogle">
            <button className={styles.button}>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

// Export the HomePage component as the default export of this module
export default HomePage;
