import React, { useState } from "react";
import Leftbar from "../Leftbar";
import { createMaterial } from "../../api/material";
import toast from "react-hot-toast";

function CreateMaterial() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    classname: "",
    subjectname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await createMaterial(formData);
    if (data.success) {
      toast.success("material added");
    }
  };

  return (
    <div className="max-w-screen max-h-screen flex overflow-hidden">
      <div className="w-1/4 h-screen">
        <Leftbar />
      </div>
      <div className="p-4 w-3/4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Create Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="classname"
              className="block text-sm font-medium text-gray-700"
            >
              Class Name
            </label>
            <input
              type="text"
              id="classname"
              name="classname"
              value={formData.classname}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subjectname"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="subjectname"
              name="subjectname"
              value={formData.subjectname}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMaterial;
