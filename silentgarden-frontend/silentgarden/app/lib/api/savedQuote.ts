import { SavedQuote, SavedQuoteResponse } from "@/app/types/savedQuote";

export async function createSavedQuote(
    userId: number,
    quote_id: number
): Promise<SavedQuote> {

    const response = await fetch("http://localhost:8080/saved-quotes/saving-quote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {id: userId},
            quote: {id: quote_id},
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create saved quote");
    }

    return response.json();
}

export async function getSavedQuotes(userId: number): Promise<SavedQuoteResponse[]> {
    const response = await fetch(`http://localhost:8080/saved-quotes/${userId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch saved quotes");
    }

    return response.json();
}