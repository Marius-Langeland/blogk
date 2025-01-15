import { FieldValue, QueryDocumentSnapshot, serverTimestamp, type SnapshotOptions } from "firebase/firestore";

export class Submission{
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

export class Block{
    type: string;
    data: {};
    constructor () {
        this.type = '';
        this.data = {};
    }
}