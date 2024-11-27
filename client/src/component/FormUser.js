import { IoMdClose } from "react-icons/io";

const FormUser = ({
  handleSubmit,
  handleOnChange,
  handleClose,
  option,
  user,
}) => {
  return (
    <div className="flex justify-center items-center absolute left-0 right-0 bottom-0 top-0 rounded bg-slate-200 bg-opacity-70">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[420px] p-10 shadow-lg bg-slate-300"
      >
        <div
          onClick={handleClose}
          className="flex text-xl items-center justify-center cursor-pointer ml-auto w-8 h-8 border border-blue-900 rounded"
        >
          <IoMdClose />
        </div>
        <div className="flex text-xl items-center justify-center font-semibold">
          {option} User
        </div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-3 mb-2 p-2"
          onChange={handleOnChange}
          value={user.name}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-3 mb-2 p-2"
          onChange={handleOnChange}
          value={user.email}
        />
        <label htmlFor="mobile">Mobile: </label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          className="mt-3 mb-2 p-2"
          onChange={handleOnChange}
          value={user.mobile}
        />

        <button className="text-base mt-5 p-2 text-white bg-blue-900 rounded hover:bg-blue-800">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormUser;
