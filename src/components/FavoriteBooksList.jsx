import React, { useState, useEffect } from 'react';
import { Box, Typography, Pagination, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, ThumbUp as LikeIcon, Comment as CommentIcon } from '@mui/icons-material';
import BookImageViewer from './BookImageViewer'; // Replace with the correct path to BookImageViewer

const favoriteBooks = [
  { id: 1, title: 'Favorite Book 1', imageUrl: 'http://localhost:8000/api/books/1/image' },
  { id: 2, title: 'Favorite Book 2', imageUrl: 'http://localhost:8000/api/books/2/image' },
  // Add more favorite books as needed
];

const FavoriteBooksList = () => {
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box textAlign="center" mx="auto" mt={4}>
      <Typography variant="h4" component="div" gutterBottom>
        My <span style={{ color: '#f50057' }}>Favorite Books</span>
      </Typography>

      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" gap={4}>
        {favoriteBooks
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
                  <FavoriteIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>

      <Pagination
        count={Math.ceil(favoriteBooks.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        size="large"
        color="secondary"
        style={{ marginTop: '16px' }}
      />
    </Box>
  );
};

export default FavoriteBooksList;
