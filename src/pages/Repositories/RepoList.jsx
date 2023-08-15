import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RepoList() {
  let { user } = useParams();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${user}`)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  if (!userData) {
    return <div className="loading">Carregando...</div>;
  }

  console.log(userData);

  return (
    <div>
      <h1>{userData.name}</h1>
      <img src={userData.avatar_url} alt="user photo" />
    </div>
  );
}
