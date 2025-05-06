export interface JournalEntry {
    title: string;
    content: string;
    userId: number;
}

export interface JournalResponse {
    journal: JournalEntry;
    created_at: Date;
}