import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState([]);
  const [randomUser, setRandomUser] = useState(null);

  const handleUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  //   useEffect(() => {
  //     const fetchRandomGitHubUser = async () => {
  //       try {
  //         const randomPage = Math.floor(Math.random() * 100) + 1; //
  //         const searchUrl = `https://api.github.com/search/users?q=followers:>=0&per_page=1&page=${randomPage}`;

  //         const response = await fetch(searchUrl);
  //         if (response.ok) {
  //           const data = await response.json();
  //           if (data.items && data.items.length > 0) {
  //             setRandomUser(data.items[0].login);
  //           } else {
  //             console.error("Nenhum usuário encontrado na página aleatória.");
  //           }
  //         } else {
  //           console.error("Erro ao obter dados do usuário aleatório do GitHub.");
  //         }
  //       } catch (error) {
  //         console.error("Erro ao realizar a requisição:", error);
  //       }
  //     };
  //     fetchRandomGitHubUser();
  //   }, []);

  return (
    <main className="home__container">
      <section>
        <input type="text" placeholder="User" onChange={(e) => handleUser(e)} />

        <div className="home__buttons">
          <Link to={`user/${user}`}>
            <button>Go!</button>
          </Link>
          <Link to="/random">
            <button>Random User!</button>
          </Link>
        </div>
      </section>
      <div>{user}</div>
    </main>
  );
}
