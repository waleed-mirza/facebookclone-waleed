import React from "react";
import {
  DotsHorizontalIcon,
  SearchIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
  {
    name: "Waleed mirza",
    src: "https://picsum.photos/500/500?random=1",
  },
  {
    name: "Kamran saifullah",
    src: "https://picsum.photos/500/500?random=1",
  },
  {
    name: "Abdul rehamn",
    src: "https://picsum.photos/500/500?random=1",
  },
  {
    name: "Hamza Mehbob",
    src: "https://picsum.photos/500/500?random=1",
  },
  {
    name: "Sameer Shahid",
    src: "https://picsum.photos/500/500?random=1",
  },
];

function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {contacts.map((contact) => (
        <Contact key={contact.name} name={contact.name} src={contact.src} />
      ))}
    </div>
  );
}

export default Widgets;
