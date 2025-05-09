import { fetchQuoteById } from "@/utils/api";
import { Quote } from "@/types/quote";
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

interface QuotePageProps {
  params: { id: string };
}

export default async function QuotePage({ params }: QuotePageProps) {
  const quote: Quote = await fetchQuoteById(Number(params.id));

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Link href="/">
          <Button variant="outlined">Back to Home</Button>
        </Link>
      </Box>
      <Typography variant="h5" gutterBottom>{quote.quote}</Typography>
      <Typography variant="subtitle1">— {quote.author}</Typography>
    </Container>
  );
}
