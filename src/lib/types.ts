import { FieldValue, QueryDocumentSnapshot, serverTimestamp, type DocumentData, type SnapshotOptions } from "firebase/firestore";

export class Submission {
    blocks: Block[];
    name: string;
    group: string;
    isPrivate: boolean;
    timeCreated: FieldValue;
    author: string;
    constructor (name: string, group: string, blocks: Block[], isPrivate: boolean, author: string, timeCreated = serverTimestamp()) {
        this.blocks = blocks;
        this.isPrivate = isPrivate;
        this.timeCreated = timeCreated;
        this.name = name;
        this.group = group;
        this.author = author;
    }
}

export class Block {
    type: string;
    data: {};
    constructor () {
        this.type = '';
        this.data = {};
    }
}

export const submissionConverter = {
    toFirestore: (sub : Submission) => {
        return {
            name: sub.name,
            group: sub.group,
            blocks: sub.blocks,
            isPrivate: sub.isPrivate,
            timeCreated: sub.timeCreated,
            author: sub.author,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions = {}) => {
        const data = snapshot.data(options);
        return new Submission(data.name, data.group, data.blocks, data.isPrivate, data.timeCreated, data.author);
    },
}

export class UserData {
    isPrivate: boolean;
    uid: string;
    displayName: string;
    profileIcon: string;

    constructor(privacy: boolean, uid: string, name: string, icon: string) {
        this.isPrivate = privacy;
        this.uid = uid;
        this.displayName = name;
        this.profileIcon = icon;
    }
}

export const userDataConverter = {
    toFirestore: (user : UserData) => {
        return {
            name: user.displayName,
            isPrivate: user.isPrivate,
            uid: user.uid,
            profileIcon: user.profileIcon,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions = {}) => {
        const data = snapshot.data(options);
        return new UserData(data.isPrivate, data.uid, data.name, data.profileIcon);
    },
    fromFirestoreData: (data: DocumentData) => {
        return new UserData(data.isPrivate, data.uid, data.name, data.profileIcon);
    },
}