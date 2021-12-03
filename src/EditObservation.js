import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ToggleButton } from "react-bootstrap";
import { ToggleButtonGroup } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { readObservation, updateObservation } from "./utils/api";

const EditObservation = () => {
  const [observation, setObservation] = useState({});
  const [oldObservation, setOldObservation] = useState({});
  const history = useHistory();
  const { observationId } = useParams();

  // need this to translate the numbers from DB to actual words
  const skyConditions = {
    100: "Cloudless",
    101: "Some clouds",
    102: "Cloud covered",
    103: "Foggy",
    104: "Raining",
    106: "Snowing",
    108: "Hailing",
    109: "Thunderstorms",
  };

  useEffect(() => {
    readObservation(observationId)
      .then((res) => {
        setObservation(res)
        // set old observation for dropdown small text
        setOldObservation(res)
      })
      .catch(console.error);
  }, [observationId]);

  const handleUnitChange = (value) => {
    setObservation({
      ...observation,
      unit: value,
    });
  };

  const handleChange = (e) => {
    setObservation({
      ...observation,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateObservation(observation)
      .then(() => history.push("/"))
      .catch(console.error);
  };

  return (
    <div>
      <h1>Edit Observation</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="latitude">Latitude</Form.Label>
          <Form.Control
            type="number"
            className="form-control"
            name="latitude"
            id="latitude"
            min="-90"
            max="90"
            step="0.01"
            value={observation.latitude}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="longitude">Longitude</Form.Label>
          <Form.Control
            type="number"
            name="longitude"
            className="form-control"
            id="longitude"
            min="-180"
            max="180"
            step="0.01"
            value={observation.longitude}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* TEMPERATURE INPUTS */}
        <h5>Select a temperature unit</h5>
        <ToggleButtonGroup
          type="radio"
          name="unit"
          onChange={handleUnitChange}
          required
        >
          <ToggleButton id="fahrenheit" value={"F"} className="toggle-btn">
            Fahrenheit
          </ToggleButton>
          <ToggleButton id="celcius" value={"C"} className="toggle-btn">
            Celcius
          </ToggleButton>
        </ToggleButtonGroup>

        {observation.unit === "C" && (
          <Form.Group>
            <Form.Label htmlFor="celcius">Temperature in Celcius</Form.Label>
            <Form.Control
              type="number"
              name="air_temperature"
              className="form-control"
              id="celcius"
              min="-50"
              max="107"
              step="0.1"
              value={observation.air_temperature}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        {observation.unit === "F" && (
          <Form.Group>
            <Form.Label htmlFor="fahrenheit">
              Temperature in Fahrenheit
            </Form.Label>
            <Form.Control
              type="number"
              name="air_temperature"
              className="form-control"
              id="fahrenheit"
              min="-60"
              max="224"
              step="0.1"
              value={observation.air_temperature}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Form.Select
          className="form-select"
          onChange={handleChange}
          id="sky_condition"
          name="sky_condition"
        >
          <option>-- Select a sky condition --</option>
          <option value="100">Cloudless</option>
          <option value="101">Some clouds</option>
          <option value="102">Cloud Covered</option>
          <option value="103">Foggy</option>
          <option value="104">Raining</option>
          <option value="106">Snowing</option>
          <option value="108">Hailing</option>
          <option value="109">Thunderstorms</option>
        </Form.Select>
        <small style={{ display: "block" }}>
          Previous sky condition: {skyConditions[oldObservation.sky_condition]}
        </small>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default EditObservation;
