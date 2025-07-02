import { useState } from "react";
import { useDeleteTodoMutation, useEditTodoMutation, useGetTodoQuery, usePostTodoMutation } from "../store/services/user";

const Main = () => {
  const { data, isLoading } = useGetTodoQuery({});
  const [postTodo, {isLoading: isPosting}] = usePostTodoMutation();
  const [editTodo, {isLoading: isEditing}] = useEditTodoMutation();
  const [deleteTodo, {isLoading: isDeleting}] = useDeleteTodoMutation();


  const[title, setTitlle] =useState("")
  const[description, setDescription] =useState("")
  const handleSubmit = async () => {
    console.log(title, description);
    if (selectedEditItem) {
      const res = await editTodo({todo_id: selectedEditItem.id, todo: {id: selectedEditItem.id, title, description}});

      if (res) {
        console.log(res);
      } else {
        console.log("error");
      } 
    } else {
      // const res = await postTodo({title, description});
      const res = await postTodo({todo: {title, description}});

      if (res) {
        console.log(res);
      } else {
        console.log("error");
      }      
    }
    setSelectedEditItem(null);
    setDescription("");
    setTitlle("");
  }


  const handleDelete = async (id: string) => {
    const respons = await deleteTodo(id);
    if (respons) {
      console.log(respons);
    } else {
      console.log("error");
    }
  };

  const [selectedEditItem, setSelectedEditItem] = useState<Todo | null>(null);
  const handleEdit = (item: Todo) => {
    setTitlle(item.title);
    setDescription(item.description);
  };
  

  return (
    <div className="bg-gradient-to-r from-[#1a5193] to-indigo-500">
      <div className="grid grid-cols-2 px-20 gap-10 py-10">
        <div className=" h-full flex flex-col items-center gap-5">
          <p className="text-3xl font-bold text-white">TODO POST DATA FORM</p>
          <div className="bg-white rounded-xl flex flex-col p-10 w-full border-l-8 border-indigo-600">
            <label htmlFor="" className="mb-2 font-bold text-xl">
              Title:
            </label>
            <input
              type="text"
              placeholder="Enter Your Title"
              className="bg-black/20 p-2 rounded-xl outline-none px-5 border border-indigo-600"
              value={title}
              onChange={(e) => setTitlle(e.target.value)}
            />
            <label htmlFor="" className="mb-2 font-bold text-xl mt-4">
              Dic:
            </label>
            <textarea rows={5}
              placeholder="Enter Your Dic"
              className="bg-black/20 p-2 rounded-xl outline-none px-5 border border-indigo-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button onClick={() => {handleSubmit()}} className="bg-gradient-to-r px-8 py-2 rounded-xl cursor-pointer text-white font-bold from-[#1a5193] to-indigo-500 ">
                {selectedEditItem ? "Edit" : "Post"}
              </button>
            </div>
          </div>
        </div>
        <div className=" h-full flex flex-col items-center justify-center gap-5">
          <p className="text-3xl font-bold text-white">TODO USER'S DATA FORM</p>
          {data?.map((item) => (
            <div key={item.id} className="bg-white rounded-xl flex flex-col p-10 w-full border-l-8 border-indigo-600">
              <label htmlFor="" className="mb-2 font-bold text-xl">
                Title:
              </label>
              <p>{item.title}</p>
              <label htmlFor="" className="mb-2 font-bold text-xl mt-2">
                Dic:
              </label>
              <p>{item.description}</p>
              <div className="flex justify-end mt-4 gap-2">
                <button onClick={() => {setSelectedEditItem(item); handleEdit(item);}} className="bg-gradient-to-r px-8 py-2 rounded-xl cursor-pointer text-white font-bold from-[#24931a] to-green-800 ">
                  Edit
                </button>
                <button onClick={() => {handleDelete(item.id)}} className="bg-gradient-to-r px-8 py-2 rounded-xl cursor-pointer text-white font-bold from-[#931a1a] to-indigo-500 ">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
