import Transcripts from "./transcripts.json";
import FireMap from "./fire.json";

export const transcripts = (Transcripts as Transcript[]).sort((a, b) => {
    const aDate = Date.parse(a.releaseDate);
    const bDate = Date.parse(b.releaseDate);
    return bDate - aDate;
});

export const fires = FireMap as { [key: string]: number };

export interface FireDataPoints {
    [key: string]: number;
}

export interface ContentPhrase {
    weight: number;
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
