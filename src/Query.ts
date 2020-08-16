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

export interface ChartDataPoint {
    transcript: Transcript;
    references: number;
}

export const queryData = (word: string): ChartDataPoint[] => {
    const dataPoints: ChartDataPoint[] = [];
    transcripts.forEach((transcript) => {
        let refs = 0;
        transcript.content &&
            transcript.content.forEach((phrase) => {
                if (
                    phrase.content
                        .toLowerCase()
                        .includes(` ${word.toLowerCase()} `)
                ) {
                    refs++;
                }
            });
        refs > 0 &&
            dataPoints.push({ transcript: transcript, references: refs });
    });
    return dataPoints;
};
