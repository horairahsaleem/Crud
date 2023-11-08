import express from 'express';
import { getUsers, addUser, getUserById, editUser, deleteUser } from '../controller/user-controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/add', addProducts);
router.put('/:id', editProduct);
router.delete('/:id', deleteproduct);

export default router;