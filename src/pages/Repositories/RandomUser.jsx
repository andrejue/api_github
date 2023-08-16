import { useQuery } from "react-query";

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

  return (
    <div>
      <h1>Random User</h1>
      {fullUserQuery.isLoading ? (
        <div>Carregando dados do usuário...</div>
      ) : fullUserQuery.isError ? (
        <div>Erro ao carregar os dados do usuário.</div>
      ) : (
        <div>
          <p>Login: {fullUserQuery.data.login}</p>
          <p>Name: {fullUserQuery.data.name}</p>
          <p>City: {fullUserQuery.data.location}</p>
          <a
            href={`https://api.github.com/users/${fullUserQuery.data.login}/repos`}
          >
            Repositórios
          </a>
          <img src={fullUserQuery.data.avatar_url} alt="" />
          <button onClick={() => randomUserQuery.refetch()}>
            Buscar Novo Usuário
          </button>
        </div>
      )}
    </div>
  );
}
