import { createContext, useEffect, useState } from "react";

const ProfileContext = createContext();

function ProfileContextProvider({children}){
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")) || null);
    const [profileAvailable, setProfileAvailable] = useState(false);

    useEffect (() => {
        localStorage.setItem("profile", JSON.stringify(profile))
    },[profile])

    return (
        <ProfileContext.Provider value={[profile, setProfile,profileAvailable, setProfileAvailable ]}>
            {children}    
        </ProfileContext.Provider>
    );
};

export {ProfileContext, ProfileContextProvider};