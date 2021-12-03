import { useState } from "react";
import { createObservation } from "./utils/api";
import Form from "react-bootstrap/Form";
import { ToggleButton } from "react-bootstrap";
import { ToggleButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CreateObservation = () => {
  const initialFormState = {
    latitude: "",
    longitude: "",
    sky_condition: "",
    air_temperature: "",
    unit: "",
  };
  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleUnitChange = (value) => {
    setFormData({
      ...formData,
      unit: value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createObservation(formData)
      .then(() => history.push("/"))
    setFormData({ ...initialFormState });
  };

  return (
    <div>
      <h1>New Observation</h1>

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
            value={formData.latitude}
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
            value={formData.longitude}
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

        {formData.unit === "C" && (
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
              value={formData.air_temperature}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        {formData.unit === "F" && (
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
              value={formData.air_temperature}
              onChange={handleChange}
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
        <button type="submit" className="btn btn-primary" disabled={formData.air_temperature === '' || formData.sky_condition === ''}>
          Submit
        </button>
      </Form>
    </div>
  );
};

export default CreateObservation;
