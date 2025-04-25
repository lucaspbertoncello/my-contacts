import delay from "../../utils/delay";

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

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`
    );
  }
}

export default HttpClient;
