import { useSelector } from "react-redux";
import type { RootState } from "../store";


const Dashbord = () => {
  const { userdata } = useSelector((state: RootState) => state.global);
  return (
    <div className='text-center text-white bg-gradient-to-r from-[#1a5193] to-indigo-500 gap-3 h-screen w-full flex items-center justify-center'>
      <h1 className="text-2xl ">Wellcome to Dashbord <span className="underline font-bold text-3xl">{userdata.first_name} {userdata.last_name}</span></h1>
      <img src={userdata.profile_picture} alt="" className="h-20 w-20 rounded-full"/>
    </div>
  )
}

export default Dashbord