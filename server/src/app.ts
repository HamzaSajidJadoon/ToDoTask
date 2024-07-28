import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes, Model } from 'sequelize';

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Sequelize
const sequelize = new Sequelize('postgres://postgres:010203@localhost:5432/mydatabase');

// Define User model
class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,   // Integer type for primary key
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,    // String type for username
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,    // String type for password
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false  // Disable timestamps
});

// Define TodoList model
class TodoList extends Model {
  public id!: number;
  public user_id!: number;
  public task!: string;
}

TodoList.init({
  id: {
    type: DataTypes.INTEGER,   // Integer type for primary key
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,   // Integer type for foreign key
    allowNull: false,
  },
  task: {
    type: DataTypes.STRING,    // String type for task
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'TodoList',
  tableName: 'todolist',
  timestamps: false  // Disable timestamps
});

// Synchronize models with database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Create new user
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
});

// API for adding a task
app.post('/addtodo', async (req, res) => {
  const { user_id, task } = req.body;
  try {
    const newTask = await TodoList.create({ user_id, task });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'An error occurred while adding the task.' });
  }
});

// API for retrieving tasks for a specific user
app.get('/gettodos/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const tasks = await TodoList.findAll({ where: { user_id } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the tasks.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
