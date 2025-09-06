import React, { useState, useEffect } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
    return (
        <li className="todo-item">
            <span 
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                onClick={() => toggleComplete(todo.id)}
            >
                {todo.text}
            </span>
            <div className="todo-actions">
                <button 
                    className="complete-button" 
                    onClick={() => toggleComplete(todo.id)}
                >
                    {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                    className="delete-button" 
                    onClick={() => deleteTodo(todo.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }]);
            setInputValue('');
        }
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-app">
            <h1>My Todo List</h1>
            <form className="todo-form" onSubmit={addTodo}>
                <input
                    type="text"
                    className="todo-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new todo..."
                />
                <button type="submit" className="add-button">Add</button>
            </form>
            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        toggleComplete={toggleComplete} 
                        deleteTodo={deleteTodo} 
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;