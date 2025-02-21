import express from 'express';
import { addSize, getSize, getSizebyId, removeSize, updateSize } from '../controller/size.js';

const RouterSize = express.Router();

RouterSize.get(`/size`, getSize)
RouterSize.post(`/size`, addSize)
RouterSize.put(`/size/:id`, updateSize)
RouterSize.get(`/size/:id`, getSizebyId)
RouterSize.delete(`/size/:id`, removeSize)

export default RouterSize;