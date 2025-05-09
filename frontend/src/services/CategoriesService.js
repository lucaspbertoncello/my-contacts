import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3000");
  }

  async listCategories(orderBy) {
    return this.httpClient.get(`/categories?orderBy=${orderBy}`);
  }
}

export default new CategoriesService();
