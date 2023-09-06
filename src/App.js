import SearchBar from "./components/SearchBar/SearchBar";
import Users from "./components/Users/Users";
import "./App.css";
import { useEffect, useState } from "react";

const API_URL = "https://users-app-backend.onrender.com";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // TODO: Fetch data here
  useEffect(() => {
    // console.log("<App /> useEffect() fired");
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/users`);
        // console.log(response);
        const json = await response.json();
        // console.log("<App /> useEffect() feteched data", json);
        const { data, error } = json;
        if (response.ok) {
          setUsersData(data);
          setLoading(false);
          //create and error to see state update
        } else {
          setError(error);
          setLoading(false);
        }
      } catch (err) {
        console.log(`App /> useEffect error: ${err.message}`);
        setLoading(false);
        setError(err.message);
      }
    }
    fetchData();
  }, []);
  console.log(usersData);
  return (
    <div className="App">
      <h1>Our Users</h1>
      <SearchBar />
      <Users />
    </div>
  );
}

export default App;
