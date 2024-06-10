import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/system';

interface Book {
  author: string;
  title: string;
  coverPhotoURL?: string;
}

interface SearchBarProps {
  books: Book[];
  onSearch: (term: string) => void;
  onSelectBook: (book: Book) => void;
}

const StyledTextField = styled(TextField)({
  margin: '0 auto',
  width: '100%',
  maxWidth: 'screen',
  marginRight:'300px',
  // marginLeft:'200px',
  // marginHorizontal:"200px",
  backgroundColor: '#fff',
  borderRadius: '4px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    marginVertical:'100px'
  },
});

const DropdownList = styled(List)({
  position: 'absolute',
  zIndex: 10,
  width: '100%',
  maxWidth: 'screen',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '4px',
  borderRadius: '4px',
  height:"500px",
  overflowY:'scroll',
  
});

const SearchBar: React.FC<SearchBarProps> = ({ books, onSearch, onSelectBook }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    setShowDropdown(books.length > 0 && inputValue.length > 0);
  }, [books, inputValue]);

  return (
    <div style={{ position: 'relative' }}>
      <StyledTextField
        variant="outlined"
        placeholder="Search for a book by title"
        onChange={(e) => {
          setInputValue(e.target.value);
          onSearch(e.target.value);
        }}
        fullWidth
        className="items-center w-1/2 justfy-center"
      />
      {showDropdown && (
        <Paper component="div">
          <DropdownList
          className="md:ml-[200px]"
          >
            {books.map((book, index) => (
              <ListItem 
                button 
                key={index} 
                onClick={() => {
                  onSelectBook(book);
                  setInputValue('');
                  setShowDropdown(false);
                }}
              >
                <ListItemText primary={book.title} secondary={book.author} />
              </ListItem>
            ))}
          </DropdownList>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
