import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { authGoogle } from '../config/firebaseConfig';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

export default function Login() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authGoogle) {
      const unsubscribe = onAuthStateChanged(authGoogle, (user) => {
        if (user) {
          setIsLoggedIn(true);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        router.push('/IntervalController');
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoggedIn]);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(authGoogle, provider);
    const user = result.user;
    console.log(user);
  
    // Check if the user has multiple accounts and prompt them to choose
    if (result.additionalUserInfo?.profile?.email) {
      const email = result.additionalUserInfo.profile.email;
      const accounts = user.providerData
        .filter((p) => p.providerId === 'google.com')
        .map((p) => p.email);
  
      if (accounts.length > 1) {
        const selectedAccount = prompt(
          `Choose your Google account (${accounts.join(', ')})`
        );
        if (selectedAccount) {
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ login_hint: selectedAccount });
          await signInWithPopup(authGoogle, provider);
        }
      }
    }
  
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      <h1 className="label login">Login with Google</h1>
      {!isLoggedIn && (
        <button
          className="button"
          onClick={handleSignInWithGoogle}
        >
          Login with Google
        </button>
      )}
      {isLoggedIn && (
        <div className="containerRoda">
          <p className="abelLoggingRoda">Logging in...</p>
          <div className="loaderContainer">
            <div className="loader"></div>
          </div>
          <p className="labelRedi">Redirecting...</p>
        </div>
      )}
      <style jsx>{`
        .loaderContainer {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 2s linear infinite;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 0 20px;
          text-align: center;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .button{
          background-color: white;
          color: black;
          padding: 10px;
          border-radius: 5px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}