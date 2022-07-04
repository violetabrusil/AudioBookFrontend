import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { app , auth} from "../multimedia"

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

    //función para registrar un usuario
    const signUp = async (email, password, userName, urlImage) => {
        const rol = "author"
        const infoUser = await createUserWithEmailAndPassword(auth, email, password, userName,
            rol, urlImage).then((userFirebase) => {
                console.log(userFirebase.user.uid);
                return userFirebase.user.uid;
            });
        console.log("user uid", infoUser);
        const docuRef = doc(firestore, `users/${infoUser}`);
        console.log("doc", docuRef)
        setDoc(docuRef, { userName: userName, rol: rol, photo: urlImage, email: email, access: "true" });
        const actualUser = await getDoc(docuRef);
        console.log("actual user", actualUser);
    };

    //función para login de usuario con cuenta de google
    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);

    }

    //función para login de un usuario
    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    //función para salir del sistema
    const logout = () => signOut(auth, GoogleAuthProvider);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("output User", currentUser)
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