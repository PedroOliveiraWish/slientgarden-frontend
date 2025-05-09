export interface QuoteEntry {
    quote_text: string;
    user: {
        id: number;
    }
}

export interface QuoteResponse {
    quoteId: number;
    quoteText: string;
    username: string;
    created_at: string;
}