// Import necessary modules and components
import { useRouter } from 'next/router'; // Next.js hook for accessing the router object
import { useEffect } from 'react'; // React hook for managing component side effects
import { onAuthStateChanged } from 'firebase/auth'; // Firebase authentication listener
import { authGoogle } from '@/config/firebaseConfig'; // Firebase authentication configuration

// Define a higher-order component that adds authentication protection to a wrapped component
const withAuth = (WrappedComponent) => {
  // Define a new component that adds authentication protection to the wrapped component
  const Auth = (props) => {
    const router = useRouter(); // Get the router object from the Next.js router hook

    // Add a Firebase authentication listener when the component mounts
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(authGoogle, (user) => {
        if (!user) { // If the user is not authenticated, redirect them to the LoginGoogle page
          router.replace('/LoginGoogle');
        }
      });
      return () => unsubscribe(); // Unsubscribe from the authentication listener when the component unmounts
    }, [router]);

    // Render the wrapped component with any passed-in props
    return <WrappedComponent {...props} />;
  };

  // If the wrapped component has a getServerSideProps function, pass it through to the Auth component
  if (WrappedComponent.getServerSideProps) {
    Auth.getServerSideProps = WrappedComponent.getServerSideProps;
  }

  // Return the Auth component as the new higher-order component
  return Auth;
};

// Export the withAuth higher-order component as the default export of this module
export default withAuth;
