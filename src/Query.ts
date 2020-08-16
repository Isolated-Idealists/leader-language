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

export const queryData = (word: string): number[] => {
    const refArray: number[] = [];
    transcripts.forEach((transcript) => {
        let refs = 0;
        transcript.content &&
            transcript.content.forEach((phrase) => {
                if (phrase.content.includes(` ${word} `)) {
                    refs++;
                }
            });
        refArray.push(refs);
    });
    return refArray;
};
