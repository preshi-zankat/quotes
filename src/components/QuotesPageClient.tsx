"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Typography, Pagination, CircularProgress, Box, Button } from "@mui/material";
import { fetchQuotes } from "@/utils/api";
import { Quote } from "@/types/quote";
import QuoteTable from "@/components/QuoteTable";

export default function QuotesPageClient() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    fetchQuotes(limit, (page - 1) * limit).then((data) => {
      setQuotes(data.quotes);
      setTotal(data.total);
      setLoading(false);
    });
  }, [page]);

  const handlePageChange = (_: any, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quotes List
      </Typography>

      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={() => router.push("/random")}>
          Get Random Quote
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <QuoteTable quotes={quotes} />
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(total / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
}