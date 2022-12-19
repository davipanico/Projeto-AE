const getUsersAPI = async (token) => {
    const url = "http://localhost:8080/user";
    const data = await fetch((url), {
        headers: new Headers({
            "authorization": `Token ${token}`
        })
    });

    const response = await data.json();

   const users = response.map((user) => user)

    return users
}

export default getUsersAPI;