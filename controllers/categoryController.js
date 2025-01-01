const Category = require('../models/categorySchema');


module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categoryList', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    await category.save();
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.remove();
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
