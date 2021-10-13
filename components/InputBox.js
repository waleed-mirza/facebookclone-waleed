import { useSession } from "next-auth/client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

function InputBox() {
  const [imageToPost, setImageToPost] = useState(null);
  const [session] = useSession();
  const inputref = useRef(null);
  const filePickerRef = useRef(null);

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputref.current.value) {
      return;
    }
    (async function () {
      await addDoc(collection(db, "posts"), {
        message: inputref.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: serverTimestamp(),
      }).then((document) => {
        if (imageToPost) {
          const storageRef = ref(storage, `posts/${document.id}`);
          uploadString(storageRef, imageToPost, "data_url").then((snapshot) => {
            removeImage();
            getDownloadURL(snapshot.ref).then(async function (downloadURL) {
              const referencedDoc = doc(db, "posts", document.id);
              await updateDoc(referencedDoc, {
                imageURL: downloadURL,
              });
            });
          });
        }
      });
    })();
    inputref.current.value = "";
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setImageToPost(event.target.result);
    };
    inputref.current.focus();
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="rounded-2xl shadow-md text-gray-500 front-medium mt-6 p-2 bg-white">
      <div className="flex space-x-4 items-center p-4">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          layout="fixed"
          src={session.user.image}
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 focus:outline-none flex-grow px-5"
            type="text"
            ref={inputref}
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Send Post
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain"
              src={imageToPost}
              alt="uploaded error"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="customIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => {
            filePickerRef.current.click();
          }}
          className="customIcon"
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
        <div className="customIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
