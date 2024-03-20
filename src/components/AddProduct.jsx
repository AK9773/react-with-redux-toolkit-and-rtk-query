import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useAddProductMutation } from "../features/productApi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const addProductHandle = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("thumbnail", product.thumbnail[0]);

    for (let image of product.images) {
      formData.append("images", image);
    }

    const response = await addProduct(formData);

    if (response.data.statusCode === 201) {
      reset();
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addProductHandle)}
      className="mx-auto w-6/12 mt-8"
    >
      <Input
        label="Product Name"
        type="text"
        placeholder="Enter product name"
        {...register("name")}
      />
      <Input
        label="Price"
        type="number"
        placeholder="Enter product price"
        {...register("price")}
      />

      <Input
        label="Category"
        type="text"
        placeholder="Category..."
        {...register("category")}
      />
      <Input
        label="Description"
        type="text"
        placeholder="Description"
        {...register("description")}
      />
      <Input
        label="Thumbnail"
        type="file"
        accept="image/*"
        {...register("thumbnail")}
      />
      <Input
        label="Images"
        type="file"
        multiple
        accept="image/*"
        {...register("images")}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddProduct;