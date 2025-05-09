export interface SavedQuote {
    quote_id: number;
    userId: number;
}

export interface SavedQuoteResponse {
    quote_text: string;
    username: string;
    createdAt: string;
    savedAt: string;
}