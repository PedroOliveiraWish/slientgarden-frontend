import { JournalEntry, JournalResponse } from "@/app/types/journal";

export async function getJournals({userId}: {userId: number}): Promise<JournalResponse[]> {
    const response = await fetch(`http://localhost:8080/journals/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch journals");
    }
    return response.json();
}

export async function createJournal({ title, content, userId }: JournalEntry): Promise<JournalResponse> {
    const response = await fetch("http://localhost:8080/journals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
            userId,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to create journal entry");
    }

    return response.json();
}