import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { QuoteEntry } from "@/app/types/quote";
import { createQuote } from "@/app/lib/api/quote";

import "./create-quote.css"; // Import your CSS file

export default function CreateQuote() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const form = useForm<QuoteEntry>({
    defaultValues: {
      quote_text: "",
      user: { id: 0 },
    },
  });

  // Fetch user ID from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setUserId(parsed.id);
    }
  }, []);

  const handleSubmit = async (data: QuoteEntry) => {
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    setError("");

    try {
      const response = await createQuote({
        quote_text: data.quote_text,
        user: { id: userId },
      });

      if (response) {
        form.reset();
        setOpen(false);
      } else {
        setError("Failed to create quote. Please try again.");
      }
    } catch (err) {
      console.error("Error creating quote:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          style={{ fontSize: "1.2rem", textTransform: "uppercase" }}
        >
          Create Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="create-quote-dialog">
        <DialogHeader className="create-quote-header">
          <DialogTitle>Create a new Quote</DialogTitle>
          <DialogDescription>
            Enter the quote you want to create.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="create-quote-form"
          >
            <FormField
              control={form.control}
              name="quote_text"
              rules={{ required: "Quote text is required" }}
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your quote here..."
                      {...field}
                      className="quote-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="form-error">{error}</p>}

            <Button type="submit" className="submit-btn">
              Create Quote
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
