export interface SavedQuote {
    quoteId: number;
    userId: number;
}

export interface SavedQuoteResponse {
    quote_text: string;
    username: string;
    createdAt: string;
    savedAt: string;
}