import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  function refreshPosts() {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const detach = onSnapshot(q, (querySnapshot) => {
      const activePosts = [];
      querySnapshot.forEach((doc) => {
        const tempOject = doc.data();
        tempOject.id = doc.id;
        activePosts.push(tempOject);
      });
      setPosts(activePosts);
    });
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div>
      {posts?.map((doc) => {
        return (
          <Post
            key={doc.id}
            name={doc.name}
            email={doc.name}
            message={doc.message}
            timestamp={doc.timestamp}
            image={doc.image}
            imageURL={doc.imageURL}
          />
        );
      })}
    </div>
  );
}

export default Posts;
