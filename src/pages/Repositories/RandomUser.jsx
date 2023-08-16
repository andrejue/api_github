import { useQuery } from "react-query";
import "./Repos.css";

export default function RandomUser() {
  const fetchRandomUserId = async () => {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    const randomUser = data[Math.floor(Math.random() * data.length)];
    return randomUser.login;
  };

  const fetchFullUser = async (login) => {
    if (login != undefined) {
      const response = await fetch(`https://api.github.com/users/${login}`);
      const data = await response.json();
      return data;
    }
  };

  const randomUserQuery = useQuery("randomUser", fetchRandomUserId, {
    refetchOnWindowFocus: false,
  });

  const fullUserQuery = useQuery(
    ["fullUser", randomUserQuery.data],
    () => fetchFullUser(randomUserQuery.data),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (randomUserQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (randomUserQuery.isError) {
    return <div>Error loading random user</div>;
  }

  console.log(fullUserQuery);
  const { isLoading, isError, data } = fullUserQuery;

  return (
    <div className="main__container">
      <h1>Random User</h1>
      {isLoading && data === undefined ? (
        <div>Carregando dados do usuário...</div>
      ) : isError ? (
        <div>Erro ao carregar os dados do usuário.</div>
      ) : (
        <div className="user__data">
          <p>Login: {data.login}</p>
          <p>Name: {data.name}</p>
          <p>City: {data.location}</p>
          <a href={`https://api.github.com/users/${data.login}/repos`}>
            Repositórios
          </a>
          <img src={data.avatar_url} alt="" />
          <button onClick={() => randomUserQuery.refetch()}>
            New Random User
          </button>
        </div>
      )}
    </div>
  );
}
