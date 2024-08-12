"use client";

import { useEffect, useState } from "react";
import { Todo } from "../page";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo | null;
  onSave: (todo: Todo) => void;
}

export default function TodoModal({
  isOpen,
  onClose,
  todo,
  onSave,
}: TodoModalProps) {
  const [taskModal, setTaskModal] = useState({
    id: todo?.id || undefined,
    task: todo?.task || "",
    completed: todo?.completed || false,
  });

  useEffect(() => {
    if (todo) {
      setTaskModal({
        id: todo.id,
        task: todo.task,
        completed: todo.completed,
      });
    }
  }, [todo]);

  const handleSave = () => {
    onSave({
      id: taskModal.id,
      task: taskModal.task,
      completed: taskModal.completed,
    });
    setTaskModal({
      id: undefined,
      task: "",
      completed: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none mx-2">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="relative flex flex-col w-full bg-gray-600 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              {todo ? "Edit" : "Add"} Task
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto space-y-4">
            <textarea
              value={taskModal.task}
              onChange={(e) =>
                setTaskModal({ ...taskModal, task: e.target.value })
              }
              id="task"
              rows={6}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Write your task"
              required
            />
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="iscompleted"
                  type="checkbox"
                  checked={taskModal.completed}
                  onChange={(e) =>
                    setTaskModal({ ...taskModal, completed: e.target.checked })
                  }
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="iscompleted"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Is Completed
              </label>
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="bg-red-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:ring-2 focus:ring-red-600 mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:ring-2 focus:ring-emerald-600 mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
