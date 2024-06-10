import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Book {
  author: string;
  title: string;
  coverPhotoURL?: string;
}

interface ReadingListProps {
  readingList: Book[];
  onRemoveFromReadingList: (book: Book) => void;
}

const ListContainer = styled('div')({
  marginTop: '16px',
  width:'100%'
});

const ReadingList: React.FC<ReadingListProps> = ({ readingList, onRemoveFromReadingList }) => {
  return (
    <ListContainer>
      {readingList.map((book, index) => (
        <Card key={index} style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography color="textSecondary">{book.author}</Typography>
            <Button 
              variant="contained" 
              style={{ 
                backgroundColor: '#FAAD00', 
                color: 'white', 
                borderRadius: 8, 
                padding: '8px 16px', 
                width: '100%' 
              }} 
              onClick={() => onRemoveFromReadingList(book)}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </ListContainer>
  );
};

export default ReadingList;
