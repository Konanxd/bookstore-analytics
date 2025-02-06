import React from "react";
import TextInput from "../../components/TextInput";
import InputLabel from "../../components/InputLabel";

export default function Login() {
  return (
    <div className="flex h-screen overflow-hidden w-full items-center justify-center">
      <form
        action="post"
        className="bg-white  rounded-xl drop-shadow-lg max-w-[500px] flex flex-col p-7 justify-center items-center"
      >
        <h1 className="uppercase font-bold text-xl mt-8 mb-10">login</h1>
        <div className="flex flex-col gap-4">
          <div className="flex-col flex gap-1.5">
            <InputLabel title="Username" />
            <TextInput placeholder="Username disini halo" />
          </div>
          <div className="flex-col flex gap-1.5">
            <InputLabel title="password" />
            <TextInput placeholder="Password disini halo" />
          </div>
          <div className="mt-5">
            <button className="bg-violet-500 text-white px-4 py-3 rounded uppercase w-full hover:bg-violet-400 cursor-pointer">
              login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
