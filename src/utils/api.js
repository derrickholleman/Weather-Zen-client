/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
// async function fetchJson(url, options) {
//   try {
//     const response = await fetch(url, options);

//     if (response.status === 204) {
//       return null;
//     }

//     const payload = await response.json();

//     if (payload.error) {
//       return Promise.reject({ message: payload.error });
//     }
//     return payload.data;
//   } catch (error) {
//     if (error.name !== "AbortError") {
//       console.error(error.stack);
//       return Promise.reject({ message: error.message });
//     }
//   }
// }

export async function listObservations() {
  try {
    const observationsRes = await fetch(`${API_BASE_URL}/observations`);
    return await observationsRes.json();
  } catch (err) {
    console.error(err);
  }
}

export async function createObservation(observation) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(observation),
  };
  try {
    const newObservation = await fetch(`${API_BASE_URL}/observations`, options);
    return await newObservation.json();
  } catch (err) {
    console.error(err);
  }
}

export async function readObservation(observationId) {
  try {
    const observationRes = await fetch(
      `${API_BASE_URL}/observations/${observationId}`
    );
    return await observationRes.json();
  } catch (err) {
    console.error(err);
  }
}

export async function updateObservation(observation) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(observation),
  };
  try {
    const newObservation = await fetch(
      `${API_BASE_URL}/observations/${observation.observation_id}`,
      options
    );
    return await newObservation.json()
  } catch (err) {
    console.error(err);
  }
}
