import { PRIVATE_FIREBASE_CONFIG } from "$env/static/private";
import type { PageServerLoad } from './$types';
import { getFirebase } from '$lib/firebase.client';
import { collection, getDocs, Query, type DocumentData } from 'firebase/firestore';

export const load: PageServerLoad = async ({ params }) => {
    return {
        username: params.slug,
    }
};