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
    includeScore: true,
    shouldSort: false,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 1.0,
    // distance: 5,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ["primeMinister", "content.content"],
};

export const queryData = (word: string): number[] => {
    const fuse = new Fuse(Transcripts, options);
    const matches = fuse.search(word);
    console.log(matches);
    const results = matches.map((match) => match.score!);
    console.log(results);
    return results;
};
