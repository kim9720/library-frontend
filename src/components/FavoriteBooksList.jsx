import React, { useState } from 'react';
import { Box, Typography, Pagination, IconButton, TextField } from '@mui/material';
import { Favorite as FavoriteIcon, ThumbUp as LikeIcon, Comment as CommentIcon, Search as SearchIcon } from '@mui/icons-material';
import BookImageViewer from './BookImageViewer';

const favoriteBooks = [
  { id: 31, title: 'Zuhura na Zahara', imageUrl: 'https://kim.nuwarisha.org/public/api/books/1/image' },
  { id: 32, title: 'Shangazi Katili', imageUrl: 'https://kim.nuwarisha.org/public/api/books/2/image' },
  { id: 27, title: 'Crack The Code', imageUrl: 'https://kim.nuwarisha.org/public/api/books/2/image' },

  // Add more favorite books as needed
];

const FavoriteBooksList = () => {
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredBooks = favoriteBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box textAlign="center" mx="auto" mt={4}>
      <Typography variant="h4" component="div" gutterBottom>
        My <span style={{ color: '#f50057' }}>Favorite Books</span>
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          ),
        }}
        sx={{ width: '300px', margin: '20px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" gap={4}>
        {filteredBooks
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((book) => (
            <Box key={book.id} textAlign="center">
              <BookImageViewer bookId={book.id} onClick={() => console.log('Book clicked:', book.id)} />
              <Typography variant="h6">{book.title}</Typography>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop="8px">
                <IconButton aria-label="Like">
                  <LikeIcon />
                </IconButton>
                <IconButton aria-label="Comment">
                  <CommentIcon />
                </IconButton>
                <IconButton aria-label="Favorite">
                  <FavoriteIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>

      <Pagination
        count={Math.ceil(filteredBooks.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        size="large"
        color="secondary"
        style={{ marginTop: '16px', marginBottom:'12px' }}
        
      />
    </Box>
  );
};

export default FavoriteBooksList;
