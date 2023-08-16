import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState([]);

  const handleUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

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
    </main>
  );
}
