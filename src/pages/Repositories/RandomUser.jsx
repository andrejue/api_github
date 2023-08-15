import { useQuery } from "react-query";

const fetchRandomUserId = async () => {
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();
  const randomUser = data[Math.floor(Math.random() * data.length)];
  return randomUser.login;
};

const fetchFullUser = async (login) => {
  const response = await fetch(`https://api.github.com/users/${login}`);
  const data = await response.json();
  return data;
};

export default function RandomUser() {
  const randomUserQuery = useQuery("randomUser", fetchRandomUserId);

  const fullUserQuery = useQuery(
    ["fullUser", randomUserQuery.data],
    () => fetchFullUser(randomUserQuery.data),
    {
      enabled: Boolean(randomUserQuery.data),
    }
  );

  if (randomUserQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (randomUserQuery.isError) {
    return <div>Error loading random user</div>;
  }

  console.log(fullUserQuery.data);

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
          <img src={fullUserQuery.data.avatar_url} alt="" />
          <button onClick={() => randomUserQuery.refetch()}>
            Buscar Novo Usuário
          </button>
        </div>
      )}
    </div>
  );
}
