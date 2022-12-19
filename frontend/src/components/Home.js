import classes from "./Home.module.scss";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import ValidUserContext from "./api/authCheck"
import getUsersAPI from "./api/getUsers"

function Home() {
  const navigate = useNavigate();
  const validUserContext = useContext(ValidUserContext);

  const [usersData, setUsersData] = useState([]);
  console.log(usersData)

  const submitHandler = (event) => {
    event.preventDefault();

    localStorage.removeItem("login-data");
    validUserContext.localAuthCheck();
    navigate("/");
  };

  const getUsersData = async () => {
    const localData = JSON.parse(localStorage.getItem("login-data"));
    const token = localData.token
    const users = await getUsersAPI(token);

    setUsersData(users)
  }

  useEffect(() => {
    validUserContext.localAuthCheck();

    if (!validUserContext.isLoggedIn) {
      navigate("/")
    } else {
      getUsersData();
    }

  }, [validUserContext]);

  return (
    <div className={classes.content}>
      <title className={classes.homeText}>Bem vindo!</title>
      <form onSubmit={submitHandler} className={classes.form}>
      <button
        className={classes.loginBtn}
      >
        Sair
      </button>
    </form>
    </div>
  );
}

export default Home;
