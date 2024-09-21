import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addOrUpdateTask = () => {
    if (!title.trim()) {
      alert('Task title cannot be empty!');
      return;
    }

    if (editingTaskId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, title, description } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTitle('');
    setDescription('');
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  const startEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(task.id);
  };
  const getFilteredTasks = () => {
    if (filter === 'Active') {
      return tasks.filter((task) => !task.completed);
    } else if (filter === 'Completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  };

  return (
    <div className="app-container">
      <h1>My Todo List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="btn-add" onClick={addOrUpdateTask}>
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="filter-buttons">
        <button
          className={filter === 'All' ? 'active-filter' : ''}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={filter === 'Active' ? 'active-filter' : ''}
          onClick={() => setFilter('Active')}
        >
          Active
        </button>
        <button
          className={filter === 'Completed' ? 'active-filter' : ''}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
      </div>

      <div className="task-list">
        {getFilteredTasks().length === 0 ? (
          <p className="empty-message">No tasks available</p>
        ) : (
          getFilteredTasks().map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed-task' : ''}`}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? 'Mark as Active' : 'Mark as Completed'}
                </button>
                <button onClick={() => startEditTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;