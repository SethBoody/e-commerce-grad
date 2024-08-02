import axios from "axios";

const BACKUP_HOST = "http://localhost:5000/api";

const getUserNameId = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    console.log("User not found in localStorage");
    return null;
  }

  // Parse the user JSON string to an object
  const userObject = JSON.parse(user);
  return {
    userId: userObject.id,
  };
};

export const loadNewArrivals = () => {
  return axios
    .get(`${BACKUP_HOST}/products/v1/search?newArrival=true&page=1`)
    .then((response) => response.data);
};

export const loadHandpickedProducts = () => {
  return axios
    .get(`${BACKUP_HOST}/products/v1/search?handpickedProducts=true&page=1`)
    .then((response) => response.data);
};

export const loadBrands = () => {
  return axios.get(`${BACKUP_HOST}/brands`).then((response) => response.data);
};

export const loadCategories = () => {
  return axios
    .get(`${BACKUP_HOST}/categories`)
    .then((response) => response.data);
};

export const searchProduct = (query) => {
  const queryString = new URLSearchParams(query).toString();

  return axios
    .get(`${BACKUP_HOST}/products/v1/search?${queryString}`)
    .then((response) => response.data);
};

export const loadProductDetails = (productId) => {
  return axios.get(`${BACKUP_HOST}/products/${productId}`);
};

// Cart APIS

export const loadCart = () => {
  const { userId } = getUserNameId();
  return axios.post(`${BACKUP_HOST}/cart`, { userId });
};

export const addToCart = (data) => {
  const { userId } = getUserNameId();
  return axios.post(`${BACKUP_HOST}/cart/item`, { ...data, userId });
};

export const deleteCartItem = (id) => {
  const { userId } = getUserNameId();
  return axios.post(`${BACKUP_HOST}/cart/item/${id}`, { userId });
};

// Wish List APIS

export const getWishListItems = (id) => {
  const body = getUserNameId();
  return axios.post(`${BACKUP_HOST}/wishlists`, body);
};

export const addToWishList = (productId) => {
  const { userId } = getUserNameId();
  return axios.post(`${BACKUP_HOST}/wishlists/item`, { userId, productId });
};

export const removeFromWishList = (productId) => {
  const { userId } = getUserNameId();
  return axios.post(`${BACKUP_HOST}/wishlists/item/delete`, {
    userId: userId,
    productId: productId,
  });
};

// Address APIs
export const createAddress = (body) => {
  const { userId } = getUserNameId();
  return axios.post(`${BACKUP_HOST}/addresses`, {
    userId: userId,
    ...body,
  });
};

export const deleteAddress = (id) => {
  return axios.delete(`${BACKUP_HOST}/addresses/${id}`);
};

export const getAddress = (id) => {
  const { userId } = getUserNameId();
  return axios.get(`${BACKUP_HOST}/users/addresses/${userId}`);
};

// Admin Product Operations
export const createProduct = (body) => {
  return axios.post(`${BACKUP_HOST}/products`, {
    ...body,
  });
};

export const updateProduct = (body, id) => {
  return axios.post(`${BACKUP_HOST}/products/${id}`, {
    ...body,
  });
};

export const deleteProduct = (id) => {
  return axios.delete(`${BACKUP_HOST}/products/${id}`);
};

// Brands
export const getBrands = () => {
  return axios.get(`${BACKUP_HOST}/brands`);
};

// Categories
export const getCategories = () => {
  return axios.get(`${BACKUP_HOST}/categories`);
};

// Reveiws and ratings
export const createReveiw = (body) => {
  return axios.post(`${BACKUP_HOST}/ratingreviews`, body);
};

// Orders
export const createOrders = (body) => {
  const payload = {
    ...body,
    taxId: 1,
    deliveryFee: 12,
    paymentId: 4,
    discountId: 6,
  };
  return axios.post(`${BACKUP_HOST}/orders`, payload);
};
