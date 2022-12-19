import { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"

import classes from "./LoginForm.module.scss";
import ValidUserContext from "./api/authCheck"

let isInitial = true;

function LoginForm() {
  const validUserContext = useContext(ValidUserContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitial) {
      validUserContext.localAuthCheck();
      isInitial = false;
    }

    if (validUserContext.isLoggedIn) {
      navigate("/home")
    } else {
      navigate("/")
    }
  }, [validUserContext]);

  const submitHandler = (event) => {
    event.preventDefault();

     validUserContext.apiAuthCheck(
      emailInputRef.current.value,
      passwordInputRef.current.value
    )
  };

  return (
    <>
    <div className={classes.content}>
      <title className={classes.loginTitle}>Login</title>
    
    <form onSubmit={submitHandler} className={classes.form}>
        <div>
          <p className={classes.label}>
            E-mail
            <input
              className={classes.input}
              type="email"
              id="user-name"
              name="user-name"
              autoComplete="on"
              placeholder="Insira seu e-mail aqui"
              ref={emailInputRef}
              required={!validUserContext.isLoggedIn}
            ></input>
          </p>
        </div>

        <div>
          <p className={classes.label}>
            Senha
            <input
              className={classes.input}
              type="password"
              id="user-password"
              name="user-password"
              autoComplete="off"
              placeholder="Insira sua senha aqui"
              ref={passwordInputRef}
              required={!validUserContext.isLoggedIn}
            ></input>
          </p>
        </div>
        <button
          className={classes.loginBtn}
          disabled={validUserContext.isLoggedIn}
        >
          Login
        </button>
      </form>
      </div>
      </>
  );
}

export default LoginForm;
