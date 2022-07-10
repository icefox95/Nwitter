import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 트윗을 삭제하시겠습니까?");
        if(ok) {
            try {
                //해당하는 트윗 파이어스토어에서 삭제
                await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
                //삭제하려는 트윗에 이미지 파일이 있는 경우 이미지 파일 스토리지에서 삭제
                if (nweetObj.attachmentUrl) {
                    const desertRef = ref(storageService, nweetObj.attachmentUrl);
                    await deleteObject(desertRef);
                }
            } catch (error) {
                window.alert("트윗을 삭제하는 데 실패했습니다!");
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, "nweets", nweetObj.id), {text: newNweet});
        setEditing(false);
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };
    
    return(
        <div>
            {editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input 
                        value={newNweet} 
                        placeholder="Edit your Nweet" 
                        required
                        onChange={onChange}
                    />
                    <input type="submit" value="Update Nweet" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>
            ) : ( 
            <>
                <h4>{nweetObj.text}</h4>
                { nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </>
                )}
            </> 
        )}

        </div>
    );
}

export default Nweet;
