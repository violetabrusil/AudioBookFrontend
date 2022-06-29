import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
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

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const firestore = getFirestore(app);

    const signUp = async (email, password, userName, urlImage) => {
        const rol = "authors"
        const infoUser = await createUserWithEmailAndPassword(auth, email, password, userName,
            rol, urlImage).then((userFirebase) => {
                console.log(userFirebase.user.uid);
                return userFirebase.user.uid;
            });
        console.log("user uid", infoUser);
        const docuRef = doc(firestore, `users/${infoUser}`);
        console.log("doc", docuRef)
        setDoc(docuRef, { userName: userName, rol: rol, photo: urlImage });
        const actualUser = await getDoc(docuRef);
        console.log("actual user", actualUser);
    };

    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
        
    }
    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth, GoogleAuthProvider);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("output User", currentUser)
            if (currentUser) {
                      console.log(currentUser.uid)
                      const uid = currentUser.uid;
                      const docuRef = doc(firestore, `users/${uid}`);
                      console.log("referenced",docuRef)
                        if (docuRef != null){
                            console.log("doc", docuRef)
                            setDoc(docuRef, { userName: currentUser.displayName, rol: "author", photo: currentUser.photoURL });
                            const actualUser = getDoc(docuRef);
                            console.log("actual user google", actualUser);
                         }
                    } else {
                      // User is signed out
                      // ...
                    }
            setLoading(false);
        });
        return () => unsubscribe();

    }, []);

    return (
        <authcontext.Provider value={{ signUp, login, user, logout, loading, loginWithGoogle }}>
            {children}
        </authcontext.Provider>
    );

}

export default AuthProvider;