import { authService, dbService } from "fbase";
// import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  // Redirect 방식 말고 useHistory를 사용할 수도 있다.
  // const history = useHistory()
  const onLogOutClick = () => {
    authService.signOut();
    // history.push("/")
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
    // =>은 return이다??!
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" onChange={onChange} />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogOutClick}>Log-out</button>
    </>
  );
};

export default Profile;
