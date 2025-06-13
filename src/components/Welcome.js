import React from 'react'
import GoogleSignin from '../img/btn_google_signin_dark_pressed_web.png'
import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <div className="welcome-bar">
      <main className="welcome">
        <h1>Welcome to Pookie Chat.</h1>
        <p>Sign in with Google to chat with with your Pookies.</p>
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      </main>
    </div>
  )
}

export default Welcome
