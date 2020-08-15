import Fuse from "fuse.js";
import Transcripts from "./test.json";

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
    releaseDate: Date;
    releaseType?: string;
    document?: string;
    subjects?: string;
    content: ContentPhrase[];
}

const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ["content"],
};

export const queryData = (word: string): number[] => {
    const ratings: number[] = [];
    Transcripts.forEach((transcript) => {
        const fuse = new Fuse(transcript.content, options);
        let rating = 0;
        fuse.search(word).forEach((match) => (rating += match.item.weight));
        ratings.push(rating);
    });
    return ratings;
};
