import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { validBody } from "../utils/validBody.js";
import { categorySchema } from "../validations/category.js";

export const createCategory = async (req, res, next) => {
  try {
    const errors = validBody(req.body, categorySchema);

    if (errors) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }

    const data = await Category.create(req.body);

    if (data) {
      return res.status(201).json({
        message: "Create category successfully",
        data,
      });
    }

    return res.status(500).json({
      message: "Create category failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const data = await Category.find({});
    if (data) {
      return res.status(201).json({
        message: "Get category successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Get category failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    if (data) {
      return res.status(201).json({
        message: "Get category successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Get category failed",
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá cứng
export const removeCategoryById = async (req, res, next) => {
  try {
    // if (chuaPhanLoaiCategory) {
    //   await Product.updateMany(
    //     { category: deletedCategory._id },
    //     { $set: { category: chuaPhanLoaiCategory._id } }
    //   );

    // Tìm danh mục "Chua Phan Loai"
    const chuaPhanLoaiCategory = await Category.findOne({
      name: "Chua Phan Loai",
    });

    if (!chuaPhanLoaiCategory) {
      return res.status(404).json({
        message: "Category 'Chua Phan Loai' not found",
      });
    }

    const productsToUpdate = await Product.find({ category: req.params.id });

    // Nếu danh mục "Chua Phan Loai" tồn tại, cập nhật các sản phẩm liên quan
    await mongoose.Promise.all(
      productsToUpdate.map(async (product) => {
        product.category = chuaPhanLoaiCategory._id;
        await product.save();
      })
    );
    // Xoá danh mục từ cơ sở dữ liệu
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Remove category successfully",
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá mềm
export const softRemoveCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(
      req.params.id,
      {
        hide: true,
      },
      { new: true }
    );
    if (data) {
      return res.status(200).json({
        message: "Remove category successfully!",
        data,
      });
    }
    return res.status(400).json({
      message: "Remove category failed!",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const errors = validBody(req.body, categorySchema);
    if (errors) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }
    console.log(req.params.id);
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data) {
      return res.status(200).json({
        message: "Update category successfully!",
        data,
      });
    }
    return res.status(400).json({
      message: "Update category failed!",
    });
  } catch (error) {
    next(error);
  }
};
