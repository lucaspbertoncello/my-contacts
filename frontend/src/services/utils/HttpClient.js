import delay from "../../utils/delay";

import APIError from "../../errors/APIError";

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay();

    let body = null;

    const response = await fetch(`${this.baseUrl}${path}`);
    const contentType = response.headers.get("content-type");

    if (contentType.includes("application/json")) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(body, response);
  }
}

export default HttpClient;
