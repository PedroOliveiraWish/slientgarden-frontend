import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { QuoteResponse } from "@/app/types/quote";

import './quote_card.css';

export default function QuoteCard({
  quote,
  saveQuote,
}: {
  quote: QuoteResponse;
  saveQuote: (quote: QuoteResponse) => void;
}) {
  return (
    <Card className="card-quote">
      <CardHeader>
        <CardTitle className="quote-author">{quote.username}</CardTitle>
        <CardDescription className="quote-date">
          {new Date(quote.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="quote-text">{quote.quoteText}</CardContent>
      <CardFooter className="justify-end">
        <Button className="button-save" variant="outline" onClick={() => saveQuote(quote)}>
          save quote
        </Button>
      </CardFooter>
    </Card>
  );
}
