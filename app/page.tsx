"use client";

import { useEffect, useState } from "react";
import TodoTable from "./components/TodoTable";
import TodoModal from "./components/TodoModal";
import axios from "axios";
import Loader from "./components/Loader";

export interface Todo {
  id?: number;
  task: string;
  completed: boolean;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetches todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handles the click event for adding or editing a todo
  const handleAddOrEditClick = (todo?: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // Saves the todo (add or update)
  const handleSave = async (todo: Todo) => {
    setLoading(true);
    try {
      if (todo.id) {
        await axios.put(`/api/todos/${todo.id}`, todo);
      } else {
        await axios.post("/api/todos", todo);
      }
      fetchTodos();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Deletes a todo
  const handleDelete = async (id?: number) => {
    setLoading(true);
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="lg:mx-20 sm:mx-5 mx-2">
      <div>
        <h1 className="my-8 text-3xl text-center">Todo Next.js</h1>
        <button
          type="button"
          onClick={() => handleAddOrEditClick()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-700 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add New Task
        </button>

        <TodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          todo={editingTodo}
          onSave={handleSave}
        />
        <TodoTable
          todos={todos}
          onDelete={handleDelete}
          onEdit={handleAddOrEditClick}
        />
      </div>
    </div>
  );
}
