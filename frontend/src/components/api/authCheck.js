import { createContext, useState } from "react";

const ValidUserContext = createContext({
  isLoggedIn: false,
  apiAuthCheck: (enteredEmail, enteredPassword) => {},
  localAuthCheck: () => {},
  localLogoff: () => {}
});

export const ValidUserContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function apiAuthCheckHandler(enteredEmail, enteredPassword) {
    const body = {
      email: enteredEmail,
      password: enteredPassword,
    }
    const url =
      "http://localhost:8080/login";
    await fetch((url), {
      method: "POST",
      Headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data !== undefined) {
          localStorage.setItem("login-data", JSON.stringify({data}));
          setIsLoggedIn(true);
        } else {
          alert("Usuário ou senha invalidos");
        }
      })
      .catch((e) => {
        alert("Erro do servidor");
      });
  }

  const localAuthCheckHandler = () => {
    const localData = JSON.parse(localStorage.getItem("login-data"));
    if (localData !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  };

  const logoffHandler = () => {
    localStorage.removeItem("login-data");
    setIsLoggedIn(false);
  }

  const context = {
    isLoggedIn: isLoggedIn,
    apiAuthCheck: apiAuthCheckHandler,
    localAuthCheck: localAuthCheckHandler,
    localLogoff: logoffHandler
  };

  return (
    <ValidUserContext.Provider value={context}>
      {props.children}
    </ValidUserContext.Provider>
  );
};

export default ValidUserContext;
