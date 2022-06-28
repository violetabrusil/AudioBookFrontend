import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import { auth } from "../../src/multimedia"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { app } from "../multimedia"

export const authcontext = createContext();

export const useAuth = () => {
    const context = useContext(authcontext);
    if (!context) throw new Error('There is not auth provider')
    return context;
};

function AuthProvider({ children }) {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState();
    const firestore = getFirestore(app);

    const signUp = async (email, password, userName, urlImage) => {
        const rol = "authors"
        const infoUser = await createUserWithEmailAndPassword(auth, email, password, userName, 
            rol, urlImage).then((userFirebase) => {
                console.log(userFirebase.user.uid);
                return userFirebase.user.uid;
            });
        console.log("user uid",infoUser);
        const docuRef = doc(firestore, `users/${infoUser}`);
        console.log("doc", docuRef)
        setDoc(docuRef, {userName: userName, rol:rol, photo:urlImage});
        const actualUser = await getDoc(docuRef);
        console.log("actual user", actualUser);
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