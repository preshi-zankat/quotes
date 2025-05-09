"use client";

import { useEffect, useState } from "react";
import { Container, Button, Typography, CircularProgress, Box } from "@mui/material";
import { Quote } from "@/types/quote";
import { fetchRandomQuote } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function RandomQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getQuote = () => {
    setLoading(true);
    fetchRandomQuote().then((data) => {
      setQuote(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="outlined" onClick={() => router.push("/")}>Back to Home</Button>
        <Button variant="contained" onClick={getQuote}>New Random Quote</Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : quote && (
        <>
          <Typography variant="h5" sx={{ mt: 3 }}>{quote.quote}</Typography>
          <Typography variant="subtitle1">— {quote.author}</Typography>
        </>
      )}
    </Container>
  );
}
