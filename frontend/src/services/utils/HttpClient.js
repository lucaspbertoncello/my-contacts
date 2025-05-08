import delay from "../../utils/delay";

import APIError from "../../errors/APIError";

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, options) {
    return this.makeRequest(path, { method: "GET", headers: options?.headers });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: "POST",
      body: options?.body,
      header: options?.headers,
    });
  }

  async makeRequest(path, options) {
    await delay();

    let responseBody = null;

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options?.method,
      body: JSON.stringify(options?.body),
      headers: { "Content-Type": "application/json" },
    });

    const contentType = response.headers.get("Content-Type");

    if (contentType.includes("application/json")) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(responseBody, response);
  }
}

export default HttpClient;
