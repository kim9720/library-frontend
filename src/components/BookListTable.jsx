import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TextField,
    IconButton,
    Tooltip,
    Typography,
    Grid,
    Button,
    Box,
    Modal,
} from '@mui/material';
import BookImageViewer from './BookImageViewer'; 
import { Edit as EditIcon, Delete as DeleteIcon, Favorite as FavoriteIcon, Comment as CommentIcon, Add as AddIcon } from '@mui/icons-material';

const BookListTable = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    const [newBook, setNewBook] = useState({
        title: '',
        description: '',
        author: '',
        likes: 0,
        comments: 0,
        image: null, // Initialize with null
    });

    // State for image preview
    const [previewImage, setPreviewImage] = useState(null);

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        // Reset new book fields when closing the modal
        setNewBook({
            title: '',
            description: '',
            author: '',
            likes: 0,
            comments: 0,
            image: null,
        });

    };

    const handleAddBook = async () => {
        try {
            const formData = new FormData();
            formData.append('title', newBook.title);
            formData.append('author', newBook.author);
            formData.append('description', newBook.description);
            formData.append('image', newBook.image);

            const response = await fetch('https://kim.nuwarisha.org/public/api/books', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Book successfully added
                console.log('Book added successfully.');
                // Update the state or perform any other necessary actions
            } else {
                // Handle error response
                console.error('Error adding book:', response.status, response.statusText);
                // Implement error handling logic as needed
            }
        } catch (error) {
            console.error('Error adding book:', error);
            // Implement error handling logic as needed
        } finally {
            // Close the add modal
            handleCloseAddModal();
        }
    };



    useEffect(() => {
        // Fetch books from your API endpoint
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://kim.nuwarisha.org/public/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(0);
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    // Add state to track the book to be deleted and confirmation modal state
    const [bookToDelete, setBookToDelete] = useState(null);
    const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);

    // Function to open the confirmation modal
    const handleOpenDeleteConfirmationModal = (book) => {
        setBookToDelete(book);
        setIsDeleteConfirmationModalOpen(true);
    };

    // Function to close the confirmation modal
    const handleCloseDeleteConfirmationModal = () => {
        setBookToDelete(null);
        setIsDeleteConfirmationModalOpen(false);
    };

    // Function to handle the delete action
    const handleDeleteBook = async () => {
        try {
            // Make an API call to delete the book
            const response = await fetch(`https://kim.nuwarisha.org/public/api/books/${bookToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
            });

            if (response.ok) {
                // Book successfully deleted
                console.log('Book deleted successfully.');
                // Update the state or perform any other necessary actions
                // For example: setBooks(books.filter((book) => book.id !== bookToDelete.id));
            } else {
                // Handle error response
                console.error('Error deleting book:', response.status, response.statusText);
                // Implement error handling logic as needed
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            // Implement error handling logic as needed
        } finally {
            // Close the confirmation modal
            handleCloseDeleteConfirmationModal();
        }
    };


    return (
        <Paper >
            <Box p={2}>
                <Grid container alignItems="center" justify="flex-end">
                    <Grid item>
                        <TextField
                            label="Search"
                            variant="standard"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                            style={{ marginBottom: '16px' }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: 'auto' }}
                            onClick={handleOpenAddModal}
                            startIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>




                <TableContainer>
                    <Table size="small" dense>
                        <TableHead>
                            <TableRow>
                            <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Front Page
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Title
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Description
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Author
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Likes
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Comments
                                    </Typography>
                                </TableCell>
                             
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Actions
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredBooks
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((book) => (
                                    <TableRow key={book.id}>
                                          <TableCell>
                                            <BookImageViewer bookId={book.id} />
                                        </TableCell>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.description}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.likes}</TableCell>
                                        <TableCell>{book.comments}</TableCell>
                                      
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleOpenDeleteConfirmationModal(book)}>                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>

                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredBooks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Add Book Modal */}
                <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Add a New Book
                        </Typography>
                        <TextField
                            label="Title"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            label="Author"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={newBook.author}
                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={newBook.description}
                            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setNewBook({ ...newBook, image: file });

                                // Display image preview
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    setPreviewImage(event.target.result);
                                };
                                reader.readAsDataURL(file);
                            }}
                            style={{ marginBottom: '16px' }}
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '16px' }}
                            />
                        )}
                        {/* ... (other fields) */}
                        <Button onClick={handleAddBook} color="primary" variant="contained">
                            Add Book
                        </Button>
                        <Button onClick={handleCloseAddModal} color="secondary" variant="contained" style={{ marginLeft: '8px' }}>
                            Cancel
                        </Button>
                    </Box>
                </Modal>

                {/* Confirmation Modal */}
                <Modal open={isDeleteConfirmationModalOpen} onClose={handleCloseDeleteConfirmationModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Confirm Deletion
                        </Typography>
                        <Typography variant="body1">
                            Are you sure you want to delete the book with title: {bookToDelete ? bookToDelete.title : ''}?
                        </Typography>
                        <Button onClick={handleDeleteBook} color="primary" variant="contained" style={{ marginTop: '16px' }}>
                            Yes, Delete
                        </Button>
                        <Button
                            onClick={handleCloseDeleteConfirmationModal}
                            color="secondary"
                            variant="contained"
                            style={{ marginLeft: '8px', marginTop: '16px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Modal>


            </Box>
        </Paper>
    );
};

export default BookListTable;
