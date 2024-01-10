// UserHome.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Pagination,
  TextField,
  IconButton,
  Snackbar,
  Dialog,
  DialogContent,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  ThumbUp as LikeIcon,
} from '@mui/icons-material';
import BookImageViewer from './BookImageViewer';

const UserHome = () => {
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem('userId');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://kim.nuwarisha.org/public/api/books');
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

  const addFavorite = async (userId, bookId) => {
    try {
      const response = await fetch('https://kim.nuwarisha.org/public/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          book_id: bookId,
        }),
      });

      if (response.ok) {
        setIsSnackbarOpen(true);
        console.log('Favorite added successfully');
      } else {
        console.error('Failed to add favorite');
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const handleFavoriteClick = (bookId) => {
    addFavorite(userId, bookId);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleBookImageClick = (bookId) => {
    const selectedBook = books.find((book) => book.id === bookId);
    setSelectedBook(selectedBook);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
              <BookImageViewer
                bookId={book.id}
                onClick={() => handleBookImageClick(book.id)} 
              />
              <Typography variant="h6">{book.title}</Typography>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop="8px">
                <IconButton aria-label="Like">
                  <LikeIcon />
                </IconButton>
                <IconButton aria-label="Comment">
                  <CommentIcon />
                </IconButton>
                <IconButton aria-label="Favorite" onClick={() => handleFavoriteClick(book.id)}>
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
        style={{ marginTop: '16px',marginBottom: '12px' }}
      />

      {/* Book Details Modal */}
      <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography variant="h5" gutterBottom>
            {selectedBook ? selectedBook.title : ''}
          </Typography>
          {/* Add other book details here */}
          <Button variant="contained" color="primary" onClick={handleModalClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Snackbar for displaying the notification */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Book added to favorites successfully!"
      />
    </Box>
  );
};

export default UserHome;
