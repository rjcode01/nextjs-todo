"use client";

import { Todo } from "../page";

interface TodoTableProps {
  todos: Todo[];
  onDelete: (id?: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoTable({ todos, onDelete, onEdit }: TodoTableProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-10 px-6 py-3">
              ID
            </th>
            <th scope="col" className="w-full px-6 py-3">
              Task
            </th>
            <th scope="col" className="w-40 px-6 py-3">
              Is Completed
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {todo.id}
              </th>
              <td className="px-6 py-4">{todo.task}</td>
              <td className="px-6 py-4">{todo.completed ? "Yes" : "No"}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(todo)}
                    className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
