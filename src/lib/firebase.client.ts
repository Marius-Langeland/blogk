import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, type Auth } from "firebase/auth";
import { collection, connectFirestoreEmulator, doc, getFirestore, setDoc, type Firestore } from "firebase/firestore";
import { userDataConverter, type UserData } from "./types";

function initializeServices() {
    const config = JSON.parse(PUBLIC_FIREBASE_CONFIG);

    const firebaseApp : FirebaseApp = initializeApp(config);
    const firestore : Firestore = getFirestore(firebaseApp);
    const auth : Auth = getAuth(firebaseApp);
    const isConfigured = getApps().length > 0;    

    return { firebaseApp, firestore, auth, isConfigured }
}

function connectToEmulators({ auth, firestore } : {auth: Auth, firestore: Firestore}) {
    if(location.hostname === 'localhost') {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        connectAuthEmulator(auth, 'http://localhost:9099');
    }
}

export function getFirebase() {
    const services = initializeServices();
    if(!services.isConfigured)
        connectToEmulators(services);
    return services;
}

export function onAuth(callback: any) {
    const { auth } = getFirebase();
    return onAuthStateChanged(auth, user => {
        callback(user);
    })
}

export const login = async () => {
    // Sign in using a redirect.
    const provider = new GoogleAuthProvider();
    // Start a sign in process for an unauthenticated user.
    provider.addScope('profile');
    provider.addScope('email');
    try{
        let cred = await signInWithPopup(getFirebase().auth, provider);
    }
    catch(error){
        console.log(error);
    }
}

export const logout = () => {
    const firebase = getFirebase();
    firebase.auth.signOut();
}

export const SetUserData = (user: UserData, auth: Auth, db: Firestore) => {
    if(auth.currentUser != null && auth.currentUser.uid == user.uid) {
        let document = collection(db, 'users');
        return setDoc(doc(document, auth.currentUser.uid), userDataConverter.toFirestore(user));
    }
}