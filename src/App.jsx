import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState(null);
  const fetchUserData = () => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setUserData(null);
      });
  };

  const fetchUserRepos = () => {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        setUserRepos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setUserRepos(null);
      });
  };
  const handleClick = () => {
    fetchUserData();
    fetchUserRepos();
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Unesi korisničko ime"
      />
      <button onClick={handleClick}>Dohvati podatke</button>

      <div>
        {userData && (
          <div>
            <h3>Informacije o traženom korinsiku</h3>
            {/* Display user data here */}
          </div>
        )}
      </div>
      <div className="user-info">
        {userData ? (
          <div>
            <p>
              <strong>Korisnički podaci:</strong> {userData.login}
            </p>
            <p>
              <strong>Ime:</strong> {userData.name}
            </p>
            <p>
              <strong>Avatar korisnika: </strong>
              <br />
              <img
                src={userData.avatar_url}
                alt="Avatar korisnika"
                style={{ width: "150px", height: "auto" }}
              />
            </p>
            <p>
              <strong>Lokacija:</strong> {userData.location}
            </p>
            <p>
              <strong>Detalji korinsika: </strong> {userData.bio}
            </p>
          </div>
        ) : (
          <p>Nema korisnika sa traženim podacima!</p>
        )}
      </div>

      <div>
        {userRepos && (
          <div>
            <h3>Informacije o traženom repozitoriju</h3>
            {/* Display user repos here */}
          </div>
        )}
      </div>
      <div className="user-info">
        {userRepos ? (
          <div>
            {userRepos.map((repo) => (
              <p>
                id: {repo.id}
                <br />
                ime: <a href={repo.html_url}> {repo.name}</a>
                <hr />
              </p>
            ))}
          </div>
        ) : (
          <p>Nema repozitorija sa traženim podacima!</p>
        )}
      </div>
    </div>
  );
}

export default App;
