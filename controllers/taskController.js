const Task = require('../models/taskSchema');


exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === 'admin') {
     
      tasks = await Task.find().populate('createdBy').populate('category');
    } else {
     
      tasks = await Task.find({ createdBy: req.user.id }).populate('category');
    }

    res.render('taskList', { tasks, role: req.user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createTask = async (req, res) => {
  const { title, description, status, category } = req.body;

  try {
    const task = new Task({
      title,
      description,
      status,
      category,
      createdBy: req.user.id,
    });

    await task.save();
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, category } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    
    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.category = category;

    await task.save();
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    
    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await task.remove();
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
