import { authService } from "fbase";
// import { useHistory } from "react-router-dom";
import React from "react";

const Profile = () => {
  // Redirect 방식 말고 useHistory를 사용할 수도 있다.
  // const history = useHistory()
  const onLogOutClick = () => {
    authService.signOut();
    // history.push("/")
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log-out</button>
    </>
  );
};

export default Profile;
