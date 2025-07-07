import { Link } from "react-router-dom"


const Loginpage = () => {
  return (
    <div className="bg-gradient-to-r from-[#1a5193] to-indigo-500 h-screen">
      <div className=" h-full flex flex-col items-center justify-center gap-5">
        <p className="text-3xl font-bold text-white">LOGIN FORM</p>
       <div className="w-1/2">
         <form
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   handleSubmit();
          // }}
          className="bg-white rounded-xl flex flex-col p-10 w-full border-l-8 border-indigo-600 duration-500 hover:shadow-xl"
        >
          <label htmlFor="" className="mb-2 font-bold text-xl">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="bg-black/20 p-2 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
            // value={title}
            // onChange={(e) => setTitlle(e.target.value)}
            required
          />
          <label htmlFor="" className="mb-2 font-bold text-xl mt-4">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="bg-black/20 p-2 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 w-full mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r px-8 py-2 w-full rounded-lg cursor-pointer text-white font-bold from-[#1a5193] to-indigo-500">
              Login
            </button>
          </div>
          <p className="text-end mt-4 mr-2">Don't have an account?<Link to={"/"} className="underline underline-offset-4 text-indigo-500 font-bold text-lg">SignUp</Link></p>
        </form>
       </div>
      </div>
    </div>
  )
}

export default Loginpage