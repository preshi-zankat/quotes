import { Quote } from "@/types/quote";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from "@mui/material";
import Link from "next/link";

export default function QuoteTable({ quotes }: { quotes: Quote[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quote</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotes.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.quote}</TableCell>
              <TableCell>{q.author}</TableCell>
              <TableCell>
                <Link href={`/quote/${q.id}`} passHref>
                  <Button variant="outlined">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}