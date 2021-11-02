import Header from './Components/Header';
import Tasks from './Components/Tasks';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';

const API = 'http://localhost:5000/tasks';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();

    return data;
  };

  //add task
  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };

    const res = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //on delete task
  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //update reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className='container'>
        <Header onShowAdd={() => setShowForm(!showForm)} showForm={showForm} />

        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showForm && <AddTask onAddTask={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Task show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
