"use client";

import React, { useState, useEffect } from "react";

import QuoteCard from "@/app/components/Quotes/QuoteCard/QuoteCard";
import CreateQuote from "@/app/components/Quotes/CreateQuote/CreateQuote";

import { QuoteResponse } from "@/app/types/quote";
import { getAllQuotes } from "@/app/lib/api/quote";
import { createSavedQuote } from "@/app/lib/api/savedQuote";

import { AppBanner } from "@/app/components/banner/Banner";

import "./quote.css";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);
  const [userId, setUserId] = useState<number>();

  // Safe way to access localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const id = user ? JSON.parse(user).id : null;
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response: QuoteResponse[] = await getAllQuotes();
        console.log("Fetched quotes:", response);
        setQuotes(response);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="quote-page">
      <AppBanner title="Quotes" />

      <div className="quote-create-container">
        <div className="quote-header">
          <div className="quote-header-title">Write your thoughts</div>
          <p className="quote-header-subtitle">
            Share your thoughts with the world
          </p>
        </div>
        <CreateQuote />
      </div>

      <div className="quote-list">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.quoteId}
            quote={quote}
            saveQuote={async (quote) => {
              if (userId) {
                try {
                  await createSavedQuote(userId, quote.quoteId);
                } catch (error) {
                  console.error("Error saving quote:", error);
                }
              } else {
                console.error("User ID is not available.");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
