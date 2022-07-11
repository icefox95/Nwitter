import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, "nweets", nweetObj.id), {text: newNweet});
        setEditing(false);
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };
    
    return(
        <div className="nweet">
            {editing ? (
            <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input 
                        value={newNweet} 
                        placeholder="Edit your Nweet" 
                        required
                        autoFocus
                        onChange={onChange}
                        className="formInput"
                    />
                    <input type="submit" value="Update Nweet" className="formBtn" />
                </form>
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
            </>
            ) : ( 
            <>
                <h4>{nweetObj.text}</h4>
                { nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                {isOwner && (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>                        
                    </div>
                )}
            </> 
        )}

        </div>
    );
}

export default Nweet;
