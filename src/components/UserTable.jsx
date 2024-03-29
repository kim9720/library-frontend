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
    IconButton,
    Typography,
    TextField,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { DeleteOutline as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        // Fetch users from API
        const fetchData = async () => {
            try {
                const response = await fetch('https://kim.nuwarisha.org/public/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
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

    const handleDeleteClick = (userId) => {
        setDeleteUserId(userId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            // Assuming your backend API endpoint for deleting a user is '/api/users/{id}'
            await fetch(`https://kim.nuwarisha.org/public/api/users/${deleteUserId}`, {
                method: 'DELETE',
            });

            // If the API call is successful, update the state to reflect the deletion
            setUsers(users.filter((user) => user.id !== deleteUserId));
            setDeleteUserId(null);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error scenarios, show a notification, etc.
            setDeleteUserId(null);
            setDeleteDialogOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteUserId(null);
        setDeleteDialogOpen(false);
    };


    const [editUserId, setEditUserId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        id: null,
        name: '',
        email: '',
        role: '',
    });

    const handleEdit = (userId) => {
        // Find the user data based on userId
        const userToEdit = users.find((user) => user.id === userId);
        setEditUserId(userId);
        setEditedUserData(userToEdit);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditUserId(null);
        setEditedUserData({
            id: null,
            name: '',
            email: '',
            role: '',
        });
        setEditDialogOpen(false);
    };

    const handleEditSave = async () => {
        try {
            // Assuming your backend API endpoint for updating a user is '/api/users/{id}'
            await fetch(`https://kim.nuwarisha.org/public/api/users/${editUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUserData),
            });

            // If the API call is successful, update the state to reflect the changes
            setUsers(users.map((user) => (user.id === editUserId ? editedUserData : user)));
            handleEditDialogClose();
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error scenarios, show a notification, etc.
            handleEditDialogClose();
        }
    };


    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Paper>
            <Box p={2}>
                <TextField
                    label="Search"
                    variant="standard"
                    size="small"
                    value={search}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '16px' }}
                />

                <TableContainer>
                    <Table size="small" dense>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Email
                                    </Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Role
                                    </Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Actions
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>

                                        <TableCell >
                                            <IconButton onClick={() => handleEdit(user.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteClick(user.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this user?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {/* Create a form to edit user details */}
                    <TextField
                        label="Name"
                        fullWidth
                        value={editedUserData.name}
                        onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={editedUserData.email}
                        onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Role"
                        fullWidth
                        value={editedUserData.role}
                        onChange={(e) => setEditedUserData({ ...editedUserData, role: e.target.value })}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default UsersTable;
