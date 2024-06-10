import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Book {
  author: string;
  title: string;
  coverPhotoURL?: string;
}

interface SearchResultsProps {
  books: Book[];
  onAddToReadingList: (book: Book) => void;
}

const ResultsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '16px',
  marginTop: '16px',
});

const SearchResults: React.FC<SearchResultsProps> = ({ books, onAddToReadingList }) => {
  return (
    <ResultsGrid>
      {books.map((book, index) => (
        <Card key={index}>
          <CardMedia
            component="img"
            alt={book.title}
            height="140"
            image={book.coverPhotoURL || 'https://via.placeholder.com/150'}
          />
          <CardContent>
            <Typography variant="subtitle1">{book.title}</Typography>
            <Typography variant="body2" color="textSecondary">{book.author}</Typography>
            <Button 
              variant="contained" 
              size="small" 
              className="text-white bg-primary" 
              style={{ borderRadius: 8, padding: '8px 16px', width: '100%' }}
              onClick={() => onAddToReadingList(book)}
            >
              Add
            </Button>
          </CardContent>
        </Card>
      ))}
    </ResultsGrid>
  );
};

export default SearchResults;
