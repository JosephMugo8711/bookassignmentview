import React, { useState, useEffect } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import client from './context/client';
import { GET_BOOKS } from './context/queries';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import ReadingList from './components/ReadingList';
import { Container, Box, Typography, Grid } from '@mui/material';
import './index.css';

interface Book {
  author: string;
  title: string;
  coverPhotoURL?: string;
  readingLevel?: string;
}

const App: React.FC = () => {
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<Book[]>([]);

  // Load reading list from local storage on mount
  useEffect(() => {
    const storedReadingList = localStorage.getItem('readingList');
    if (storedReadingList) {
      setReadingList(JSON.parse(storedReadingList));
    }
  }, []);

  // Save reading list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]);

  useEffect(() => {
    if (data) {
      setFilteredBooks(data.books);
    }
  }, [data]);

  const handleSearch = (term: string) => {
    if (term.trim() === '') {
      setFilteredBooks(data?.books || []);
    } else {
      setFilteredBooks(
        data?.books.filter((book) =>
          book.title.toLowerCase().includes(term.toLowerCase())
        ) || []
      );
    }
  };

  const addToReadingList = (book: Book) => {
    if (!readingList.some((b) => b.title === book.title)) {
      setReadingList([...readingList, book]);
    }
  };

  const removeFromReadingList = (book: Book) => {
    setReadingList(readingList.filter((b) => b.title !== book.title));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <Box className="min-h-screen  p-4 bg-gray-100">
        <Typography variant="h4" className="mb-10 font-bold text-center text-primary">
          Book Assignment View
        </Typography>
        <SearchBar 
          books={filteredBooks} 
          onSearch={handleSearch} 
          onSelectBook={addToReadingList} 
        />
        <Grid container spacing={3} className="mt-10 flex-col md:flex-row w-full">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className="mb-2 font-semibold text-secondary">
              Search Results
            </Typography>
            <SearchResults books={filteredBooks} onAddToReadingList={addToReadingList} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" className="mb-2 font-semibold text-secondary">
              Reading List
            </Typography>
            <ReadingList readingList={readingList} onRemoveFromReadingList={removeFromReadingList} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const AppWrapper: React.FC = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default AppWrapper;
