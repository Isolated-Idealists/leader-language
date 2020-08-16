import Fuse from "fuse.js";
import Transcripts from "./test.json";

export const transcripts = (Transcripts as Transcript[]).sort((a, b) => {
    const aDate = Date.parse(a.releaseDate);
    const bDate = Date.parse(b.releaseDate);
    return bDate - aDate;
});

export interface ContentPhrase {
    /**
     * A calculated value representing the importance of this phrase
     */
    weight: number;
    /**
     * A phrase or keyword picked out of this transcript at the data processing phase.
     */
    content: string;
}

export interface Transcript {
    transcriptId: string;
    title: string;
    primeMinister: string;
    periodOfService: string;
    releaseDate: string;
    releaseType?: string;
    document?: string;
    subjects?: string;
    content: ContentPhrase[];
}

const options = {
    includeScore: true,
    shouldSort: false,
    threshold: 1,
    distance: 0,
    keys: ["title", "subjects", "primeMinister", "content.content"],
};

export const queryData = (word: string): number[] => {
    const fuse = new Fuse(transcripts, options);
    const matches = fuse.search(word);
    const results = matches.map((match) =>
        match.score! > 0.1 ? match.score! : 0
    );
    return results;
};
