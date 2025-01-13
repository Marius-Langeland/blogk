import { QuerySnapshot, type SnapshotOptions } from "firebase/firestore";

export class Submission{
    blocks: Block[];
    isPrivate: boolean;
    constructor (blocks: Block[], isPrivate: boolean) {
        this.blocks = blocks;
        this.isPrivate = isPrivate;
    }
}

export const submissionConverter = {
    toFirestore: (sub : Submission) => {
        return {
            blocks: sub.blocks,
            isPrivate: sub.isPrivate,
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Submission(data.blocks, data.isPrivate);
    }
}

export class Block{
    type: string;
    data: {};
    constructor () {
        this.type = '';
        this.data = {};
    }
}