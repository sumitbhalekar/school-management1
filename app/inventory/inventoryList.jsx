"use client";
import React, { useEffect, useState } from "react";
import "./inventory.css";
import api from "./api";
// import useTextHook from "./TextHook";

export const InventoryList = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    price: "",
    addedDate: "",
    expirtyDate: "",
  });
  const [errors, setErrors] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    console.log("form Data", formData);
    e.preventDefault();

    const validationErrors = validate();
    console.log("validationErrors---", validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("here---");
      setErrors(validationErrors);
      return;
    }
    // setFormData({
    //   name: "",
    //   quantity: "",
    //   category: "",
    //   price: "",
    //   addedDate: "",
    //   expirtyDate: "",
    // });
    // setErrors({});
  };

  useEffect(() => {
    GetInventoryItems();
  }, []);

  const categories = ["Electronics", "Food", "Clothing", "Grocery"];

  const ErrorText = (error) => {
    console.log("cjdbjdbjkv", error);
    return <p style={{ color: "red" }}>{error.error}</p>;
  };

  const createInventory = async (data) => {
    try {
      const response = await api.post("/inventory", data);
      return response.data;
    } catch (error) {
      console.error("post error", error);
    }
  };

  const updateInventory = async (id, data) => {
    try {
      const response = await api.put(`/inventory/${id}`, data);
    } catch (error) {
      console.log("error---", error);
    }
  };

  // const apiResponse = useTextHook("https://jsonplaceholder.typicode.com/posts");
  // console.log("apiResponse---", apiResponse);

  const GetInventoryItems = async () => {
    try {
      // const apiResponse = await fetch(
      //   "https://jsonplaceholder.typicode.com/posts",
      // )
      //   .then((res) => res.json())
      //   .then((res) => {
      //     setUsersData(res);
      //   });
      // const getInventoryItems = await api.get("/posts").then((res) => {
      //   setUsersData(res.data);
      // });
      // console.log("getInventoryItems---", getInventoryItems);
    } catch (error) {
      console.log("Error---", error);
    }
  };

  const searchBody = () => {};

  const adjustPrice = (expiryDate, originalPrice) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    //calculate difference in days
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //If already expired
    if (diffDays < 0) {
      return 0;
    }
  };

  const filteredData = usersData?.filter((user) => {
    const search = searchTerm.toLowerCase();
    console.log("User---", user);
    return (
      user?.title?.toLowerCase().includes(search) ||
      user?.userId?.toString().includes(search) ||
      user?.body?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="container">
      <input
        placeholder="Search"
        className="field"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Body</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.userId}</td>
                <td>{user.title}</td>
                <td>{user.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="field"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <ErrorText error={errors.name} />}
        <div>
          <input
            className="field"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="field"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            className="field"
            type="date"
            name="addedDate"
            value={formData.addedDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="field"
            type="date"
            name="expiryDate"
            value={formData.expirtyDate}
            onChange={handleChange}
          />
        </div>
        <div className="submitButton">
          <button type="submit">Add inventory</button>
        </div>
      </form>
    </div>
  );
};
