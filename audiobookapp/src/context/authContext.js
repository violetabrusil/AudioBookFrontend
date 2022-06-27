import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import { auth } from "../../src/multimedia"

export const authcontext = createContext();

export const useAuth = () => {
    const context = useContext(authcontext);
    if (!context) throw new Error('There is not auth provider')
    return context;
};

function AuthProvider({ children }) {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    const signUp = (email, password, userName, rol) => {
        const infoUser = createUserWithEmailAndPassword(auth, email, password, userName, 
            rol).then((userFirebase) => {
                return userFirebase
            });

    };
        

    const login = (email, password) => 
        signInWithEmailAndPassword(auth, email, password);
    
    const logout = () => signOut(auth)

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("user", currentUser)
            setLoading(false);
        });
        return () => unsubscribe();

    },[]);
       
    return (
        <authcontext.Provider value={{ signUp, login, user, logout, loading }}>
            {children}
        </authcontext.Provider>
    );

}

export default AuthProvider;