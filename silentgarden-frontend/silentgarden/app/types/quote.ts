export interface QuoteEntry {
    quote_text: string;
    user_id: number;
}

export interface QuoteResponse {
    quoteId: number;
    quoteText: string;
    username: string;
    createdAt: Date;
}