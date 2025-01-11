import { PRIVATE_FIREBASE_CONFIG } from "$env/static/private";
import type { PageServerLoad } from './$types';
import { getFirebase } from '$lib/firebase.client';
import { collection, getDocs, Query, type DocumentData } from 'firebase/firestore';

export const load: PageServerLoad = async ({ params }) => {
    
    let db = getFirebase().firestore;
    let colRef = collection(db, 'submissions');
    let querySnapshot = await getDocs(colRef);

    let submissions: DocumentData[] = [];
    
    querySnapshot.forEach(sc => {
        submissions.push(sc.data());
    });

    return {
        username: params.slug,
        submissions: submissions,
    }
};