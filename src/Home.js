import { useState, useEffect } from "react";
import { listObservations } from "./utils/api";
import { Link } from "react-router-dom";
const dayjs = require("dayjs");

function Home() {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    let isMounted = true;
    listObservations().then((res) => {
      if (isMounted) setObservations(res);
    });
    return () => (isMounted = false);
  }, [observations.length]);

  return (
    <main>
      <h1>Home</h1>
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">Sky Condition</th>
              <th scope="col">Air Temperature</th>
              <th scope="col">Unit</th>
              <th scope="col">Created</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {observations.map((observation) => (
              <tr key={observation.observation_id}>
                <td>{observation.latitude}</td>
                <td>{observation.longitude}</td>
                <td>{observation.sky_condition}</td>
                <td>{observation.air_temperature}</td>
                <td>{observation.unit}</td>
                <td>
                  {dayjs(observation.created_at).format("MM/DD/YYYY H:mm:ss")}
                </td>
                <td>
                  <Link to={`/observations/${observation.observation_id}`}>
                    <button className="btn btn-warning">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Home;
