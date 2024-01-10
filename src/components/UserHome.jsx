import React, { useState, useEffect } from 'react';
import { Box, Typography, Pagination, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, Favorite as FavoriteIcon, Comment as CommentIcon, ThumbUp as LikeIcon } from '@mui/icons-material';
import BookImageViewer from './BookImageViewer'; // Replace with the correct path to BookImageViewer

const UserHome = () => {
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box textAlign="center" mx="auto" mt={4}>
      <Typography variant="h4" component="div" gutterBottom>
        List of <span style={{ color: '#3f51b5' }}>Books</span>
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
              <BookImageViewer bookId={book.id} />
              <Typography variant="h6">{book.title}</Typography>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop="8px">
                <IconButton aria-label="Like">
                  <LikeIcon />
                </IconButton>
                <IconButton aria-label="Comment">
                  <CommentIcon />
                </IconButton>
                <IconButton aria-label="Favorite">
                  <FavoriteIcon />
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
        color="primary"
        style={{ marginTop: '16px' }}
      />
    </Box>
  );
};

export default UserHome;
