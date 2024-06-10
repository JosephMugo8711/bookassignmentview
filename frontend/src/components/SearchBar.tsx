import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const StyledTextField = styled(TextField)({
  margin: '0 auto',
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#fff',
  borderRadius: '4px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
  },
});

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <StyledTextField
      variant="outlined"
      placeholder="Search for a book by title"
      onChange={(e) => onSearch(e.target.value)}
      fullWidth
    />
  );
};

export default SearchBar;
