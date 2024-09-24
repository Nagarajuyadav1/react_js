import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Task Tracker</h1>
      <TaskForm addTask={addTask} editingTask={editingTask} updateTask={updateTask} />
      <TaskList tasks={tasks} toggleCompletion={toggleCompletion} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

const TaskForm = ({ addTask, editingTask, updateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      if (editingTask) {
        updateTask({ ...editingTask, title, description });
      } else {
        addTask(title, description);
      }
    }
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 15px' }}>
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

const TaskList = ({ tasks, toggleCompletion, deleteTask, editTask }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <Task key={task.id} task={task} toggleCompletion={toggleCompletion} deleteTask={deleteTask} editTask={editTask} />
        ))
      )}
    </div>
  );
};

const Task = ({ task, toggleCompletion, deleteTask, editTask }) => {
  return (
    <div style={{
      marginBottom: '10px',
      padding: '10px',
      border: '1px solid #ddd',
      backgroundColor: task.completed ? '#d4edda' : '#f8d7da',
      textDecoration: task.completed ? 'line-through' : 'none'
    }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => toggleCompletion(task.id)} style={{
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: task.completed ? '#28a745' : '#ffc107',
        color: 'white',
        border: 'none',
        marginRight: '10px'
      }}>
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button onClick={() => editTask(task)} style={{
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        marginRight: '10px'
      }}>
        Edit
      </button>
      <button onClick={() => deleteTask(task.id)} style={{
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none'
      }}>
        Delete
      </button>
    </div>
  );
};

export default App;