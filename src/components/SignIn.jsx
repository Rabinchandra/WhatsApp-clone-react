import React from "react";
import { provider, firebase } from "../firebase/config";

function SignIn({ setUser }) {
  const onSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="signIn__container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
        alt=""
      />
      <h3>Sign in to WhatsApp</h3>
      <button onClick={onSignIn}>Sign in with gmail</button>
    </div>
  );
}

export default SignIn;
