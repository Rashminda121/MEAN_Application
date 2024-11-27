import logo from "./logo.svg";
import "./App.css";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <div className="container max-w-[700px] m-auto mt-[50px]">
        <button
          onClick={() => setAddSection(true)}
          className="bg-blue-900 text-white px-4 py-2 text-base rounded cursor-pointer hover:bg-blue-800"
        >
          Add
        </button>

        {addSection && (
          <div className="flex justify-center items-center absolute left-0 right-0 bottom-0 top-0 rounded bg-slate-200 bg-opacity-20">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-[420px] p-10 shadow-lg"
            >
              <div
                onClick={() => setAddSection(false)}
                className="flex text-xl items-center justify-center cursor-pointer ml-auto w-8 h-8 border border-blue-900 rounded"
              >
                <IoMdClose />
              </div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-3 mb-2 p-2"
                onChange={handleOnChange}
              />
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-3 mb-2 p-2"
                onChange={handleOnChange}
              />
              <label htmlFor="mobile">Mobile: </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                className="mt-3 mb-2 p-2"
                onChange={handleOnChange}
              />

              <button className="text-base mt-5 p-2 text-white bg-blue-900 rounded hover:bg-blue-800">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
