import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";

function App() {
  const [init,setInit] = useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });

        if(user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        } 
      } 

      setInit(true);
    });
  },[]);

  const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
  }

  return (
    <>
      {init ? (
        <AppRouter 
          refreshUser={refreshUser} 
          isLoggedIn={Boolean(userObj)} 
          userObj={userObj} 
        />
        ) : ( 
          "Initializing..."
        )}
    </>
  );
}

export default App;
