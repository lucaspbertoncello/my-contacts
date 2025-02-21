const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoryRepository.findAll(orderBy);
    res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
    }

    const categorieExists = await CategoryRepository.findByName(name);

    if (categorieExists) {
      res.status(400).json({ error: "This name is already in use" });
    }

    const category = await CategoryRepository.create({ name });
    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;
    await CategoryRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
