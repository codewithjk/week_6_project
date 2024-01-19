const Models = require("../model/model");
const User = Models.user;
const Admin = Models.admin;
// Function to create a new user
const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Function to find one user by ID
const findUserById = async (userId) => {
  try {
    const user = await User.find({ _id: userId });
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to update a user
const updateUser = async (userId, updatedUserData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user
const deleteUser = async (userId) => {
  try {
    const query = await User.findByIdAndDelete(userId);
    return query;
  } catch (error) {
    throw error;
  }
};
//Function to find all users
const findAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

//Function to find user by email
const findUserByEmail = async (userEmail) => {
  try {
    const user = await User.find({ email: userEmail });
    return user;
  } catch (error) {
    throw error;
  }
};

//Function to find admin by email
const findAdminByEmail = async (userEmail) => {
  try {
    const admin = await Admin.find({ email: userEmail });
    return admin;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  findAdminByEmail,
  findAllUsers,
};
