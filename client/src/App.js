import "./App.css";

import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

import axios from "axios";
import FormUser from "./component/FormUser";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    _id: "",
    name: "",
    email: "",
    mobile: "",
  });

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getFetchedData();
  }, []);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    // console.log(data);

    if (data.data.success) {
      setAddSection(false);
      getFetchedData();
      alert(data.data.message);
      setFormData({
        name: "",
        email: "",
        mobile: "",
      });
    }
  };

  const getFetchedData = async () => {
    const data = await axios.get("/");
    //console.log(data);

    if (data) {
      setDataList(data.data.data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    // console.log(data);

    if (data.data.success) {
      getFetchedData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (user) => {
    setEditSection(true);
    setFormDataEdit(user);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    // console.log(data);

    if (data.data.success) {
      getFetchedData();
      alert(data.data.message);
    }
  };

  // console.log(dataList);

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
          <FormUser
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            option={"Add"}
            user={formData}
          />
        )}
        {editSection && (
          <FormUser
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            option={"Edit"}
            user={formDataEdit}
          />
        )}
        <div className="mt-10">
          <table>
            <thead>
              <tr className="bg-slate-300">
                <th className="min-w-[200px] p-3">Name</th>
                <th className="min-w-[200px] p-3">Email</th>
                <th className="min-w-[200px] p-3">Mobile</th>
                <th className="min-w-[200px] p-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((user) => {
                  return (
                    <tr
                      key={user._id}
                      className="text-center border-b-2 border-slate-400"
                    >
                      <td className="min-w-[200px] p-3">{user.name}</td>
                      <td className="min-w-[200px] p-3">{user.email}</td>
                      <td className="min-w-[200px] p-3">{user.mobile}</td>
                      <td className="min-w-[200px] p-3">
                        <button
                          onClick={() => handleEdit(user)}
                          className="px-2 py-2 mr-4 text-white bg-blue-700 rounded hover:bg-blue-800"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-2 py-2 text-white bg-red-700 rounded hover:bg-red-800"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center border-b-2 border-slate-400">
                  <td className="text-center p-3">No data available!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
