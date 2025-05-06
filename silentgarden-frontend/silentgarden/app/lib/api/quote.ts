import { QuoteEntry, QuoteResponse } from "@/app/types/quote";

export async function createQuote({quote_text, user_id}: QuoteEntry): Promise<QuoteResponse> {
    const response = await fetch("http://localhost:8080/quotes/save-quote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quote_text, user_id }),
    });

    if (!response.ok) {
        throw new Error("Failed to create quote");
    }

    return response.json();
}

export async function getAllQuotes(): Promise<QuoteResponse[]> {
    const response = await fetch("http://localhost:8080/quotes/get-all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch quotes");
    }

    return response.json();
}

export async function getQuotesByUserId(userId: number): Promise<QuoteResponse[]> {
    const response = await fetch(`http://localhost:8080/quotes/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch quotes by user ID");
    }

    return response.json();
}