import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div key={nweetObj.id}>
      {editing ? (
        <>
          {isOwner ?? (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={newNweet}
                  required
                  onChange={onChange}
                />{" "}
                <input type="submit" value="✅" />
              </form>
              <button onClick={toggleEditing}>❌</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>❌</button>
              <button onClick={toggleEditing}>✏</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
