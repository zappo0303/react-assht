import { StatusCodes } from "http-status-codes";
import products from "../models/products.js";
export const getProducts = async (req, res) => {
    // req là gửi yêu cầu lên 
    // res là trả về 
    try {
        // const data = await products.find().populate('tags');
        const data = await products.find().populate('tags');
        if (data.length < 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "0 co san pham" })
        }
        res.status(StatusCodes.OK).json(data);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })

    }
}
export const getProductsbyId = async (req, res) => {
    // req là gửi yêu cầu lên 
    // res là trả về 

    try {
        const data = await products.findOne({ _id: req.params.id }).populate('attributes', 'name');
        if (data.length < 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "0 co san pham" })
        }
        res.status(StatusCodes.OK).json(data);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })

    }
}
export const addProducts = async (req, res) => {
    try {
        const data = await products(req.body).save();
        res.status(StatusCodes.CREATED).json(data);
        console.log(data);

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}
export const updateProducts = async (req, res) => {

    try {
        const data = await products.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        if (data.length < 0) {
            return res.status(404).json({ message: "0 co san pham" })
        }
        res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })

    }
}
export const remove = async (req, res) => {

    try {
        const data = await products.findOneAndDelete({ _id: req.params.id });
        if (data.length < 0) {
            return res.status(404).json({ message: "0 co san pham" })
        }
        res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })

    }
}