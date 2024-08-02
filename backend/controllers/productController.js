// Import necessary modules and dependencies
const { Product, RatingReview } = require("../models");
const { asyncWrapper } = require("../middleware");
const { createCustomError } = require("../utils/errors/custom-error");
const { Op } = require("sequelize");
const { development } = require("../config/config");
const { ProductService } = require("../services");

/**
 * Creates a new product in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createProduct = asyncWrapper(async (req, res, next) => {
  // Destructure required properties from the request body
  const {
    title,
    description,
    price,
    availableInStock,
    imageUrl,
    categoryId,
    brandId,
  } = req.body;

  const existProduct = await Product.findOne({
    where: {
      title,
      description,
      price,
      // availableInStock,
      // totalRating,
      // ratingCount,
      // imageUrl,
      categoryId,
      brandId,
    },
  });

  if (existProduct) {
    return next(createCustomError("Product already exists", 200));
  }

  // Create a new product in the database
  const product = await Product.create({
    title,
    description,
    price,
    availableInStock,
    imageUrl,
    categoryId,
    brandId,
  });

  // Log the created product and send a success response
  console.log("Created product: ", product?.title);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const allProducts = await Product.findAll();

  res.status(200).json({
    success: true,
    count: allProducts.length,
    data: allProducts,
  });
});

/**
 * Retrieves all products from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getProducts = asyncWrapper(async (req, res, next) => {
  // Extract request query parameters
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const itemsPerPage = development.itemsPerPage;

  const newArrival = req.query.newArrival
    ? JSON.parse(req.query.newArrival)
    : false;

  const handpicked = req.query.handpicked
    ? JSON.parse(req.query.handpicked)
    : false;

  // where clause if the newArrival exists
  let whereClause = {};
  if (newArrival) {
    const nthMonthAgo = new Date();
    nthMonthAgo.setMonth(nthMonthAgo.getMonth() - development.newArrivalMonths);
    whereClause.createdAt = {
      [Op.gte]: nthMonthAgo,
    };
  }

  if (handpicked) {
    whereClause.price = { [Op.lte]: development.handPickedPrice };
  }

  // Fetch all products from the database
  const { count, products } = await ProductService.fetchProductsWithCount(
    {
      where: whereClause,
    },
    page,
    itemsPerPage
  );

  const totalPages = Math.ceil(count / itemsPerPage);

  // Check if the requested page exceeds the total number of pages
  if (page > totalPages && totalPages > 0) {
    // Respond with an error indicating that the page does not exist
    return next(createCustomError("Page Does not Exist", 404));
  }

  // Log the successful retrieval and send a response with the products
  console.log("Products are fetched");

  if (handpicked) {
    const handpickedProducts = products.filter(
      (product) => product.totalRating >= 4.5
    );
    const handpickedCount = handpickedProducts.length;
    const totalPages = Math.ceil(handpickedCount / itemsPerPage);

    // Check if the requested page exceeds the total number of pages
    if (page > totalPages && totalPages > 0) {
      // Respond with an error indicating that the page does not exist
      return next(createCustomError("Page Does not Exist", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        totalProducts: handpickedCount, // Update to use filtered count
        totalPages: totalPages, // Update to use filtered count
      },
      data: handpickedProducts,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    pagination: {
      currentPage: page,
      itemsPerPage: itemsPerPage,
      totalProducts: count, // Update to use filtered count
      totalPages: totalPages, // Update to use filtered count
    },
    data: products,
  });
});

/**
 * Retrieves a single product by ID from the database along with its ratingReviews.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getProduct = asyncWrapper(async (req, res, next) => {
  // Extract product ID from request parameters
  const id = Number(req.params.id);

  const product = await ProductService.fetchProductById(id);

  // If the product is found, fetch all ratingReviews associated with the product
  if (product) {
    const ratingReviews = await RatingReview.findAll({
      where: { productId: id },
    });

    // Fetch related products
    const relatedProducts = await ProductService.fetchRelatedProductsByProduct(
      id
    );
    // Send a response with product and associated ratingReviews
    return res.status(200).json({
      success: true,
      message: "Product and RatingReviews fetched successfully",
      data: {
        product: product,
        ratingReviews,
        relatedProducts,
      },
    });
  } else {
    // If the product is not found, invoke the next middleware with a custom error
    return next(createCustomError(`No product with id: ${id} is found`, 404));
  }
});

/**
 * Updates a product by ID in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const updateProduct = asyncWrapper(async (req, res, next) => {
  // Extract product ID from request parameters
  const id = Number(req.params.id);

  // Destructure product properties from the request body
  const {
    title,
    description,
    price,
    availableInStock,
    totalRating,
    ratingCount,
    imageUrl,
    categoryId,
    brandId,
  } = req.body;

  // Update the product in the database
  const [updatedRowCount] = await Product.update(
    {
      title,
      description,
      price,
      availableInStock,
      totalRating,
      ratingCount,
      imageUrl,
      categoryId,
      brandId,
    },
    { where: { id } }
  );

  // If no rows are updated, invoke the next middleware with a custom error; otherwise, fetch the updated product and send a success response
  if (updatedRowCount === 0) {
    return next(createCustomError(`No product with id: ${id} is found`, 404));
  }

  const updatedProduct = await Product.findByPk(id);
  console.log("Updated product: ", updatedProduct?.title);
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

/**
 * Deletes a product by ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const deleteProduct = asyncWrapper(async (req, res, next) => {
  // Extract product ID from request parameters
  const id = Number(req.params.id);

  // Delete the product from the database
  const deletedRowCount = await Product.destroy({ where: { id } });

  // If no rows are deleted, invoke the next middleware with a custom error; otherwise, log the deletion and send a success response
  if (deletedRowCount === 0) {
    return next(createCustomError(`No product with id: ${id} is found`, 404));
  }

  console.log("Deleted product: ", deletedRowCount);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

/**
 * Searches products by keyword or category in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.s
 */
const searchProducts = asyncWrapper(async (req, res, next) => {
  // Extract query
  const {
    keyword,
    categoryName,
    brandName,
    rating,
    ratingType, // "above" or "less"
    newArrival,
    limited,
    handpickedProducts,
  } = req.query;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const itemsPerPage = development.itemsPerPage;

  // Build the search criteria object
  const searchCriteria = {};

  if (keyword) {
    searchCriteria.title = { [Op.like]: `%${keyword}%` };
  }

  if (categoryName) {
    searchCriteria["$category.name$"] = categoryName;
  }

  if (brandName) {
    searchCriteria["$brand.name$"] = brandName;
  }

  if (newArrival) {
    const nthMonthAgo = new Date();
    nthMonthAgo.setMonth(nthMonthAgo.getMonth() - development.newArrivalMonths);
    searchCriteria.createdAt = {
      [Op.gte]: nthMonthAgo,
    };
  }

  if (limited) {
    searchCriteria.availableInStock = { [Op.lt]: 20 };
  }

  if (handpickedProducts) {
    searchCriteria.price = { [Op.lte]: development.handPickedPrice };

    const products = await ProductService.fetchProducts(
      {
        where: searchCriteria,
      },
      page,
      itemsPerPage
    );
    const handPickedProducts = products.filter((product) =>
      product.totalRating ? product.totalRating >= 4.5 : undefined
    );

    const count = handPickedProducts.length;
    const totalPages = Math.ceil(count / itemsPerPage);

    // Check if the requested page exceeds the total number of pages
    if (page > totalPages && totalPages > 0) {
      // Respond with an error indicating that the page does not exist
      return next(createCustomError("Page does not exists", 404));
    }

    console.log(
      `Handpicked Products matching ${{
        ...req.query,
      }} have been called, products length= ${handPickedProducts.length}`
    );
    return res.status(200).json({
      success: true,
      message: "Operation successful",
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        totalProducts: count, // Update to use filtered count
        totalPages: totalPages, // Update to use filtered count
      },
      data: handPickedProducts,
    });
  }

  const { products, count } = await ProductService.fetchProductsWithCount(
    {
      where: searchCriteria,
    },
    page,
    itemsPerPage
  );

  if (rating) {
    const filteredProducts = products.filter((product) => {
      if (ratingType === "above") {
        return product.totalRating ? product.totalRating >= rating : false;
      } else {
        return product.totalRating < rating;
      }
    });

    const count = filteredProducts.length;
    const totalPages = Math.ceil(count / itemsPerPage);

    // Check if the requested page exceeds the total number of pages
    if (page > totalPages && totalPages > 0) {
      // Respond with an error indicating that the page does not exist
      return next(createCustomError("Page Does not Exist", 404));
    }
    // Log the products matching the keyword, category, or brand, and send a response
    console.log(
      `Products matching ${req.query} have been called, products length= ${filteredProducts.length}`
    );
    return res.status(200).json({
      success: true,
      message: "Operation successful",
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        totalProducts: count, // Update to use filtered count
        totalPages: totalPages, // Update to use filtered count
      },
      data: filteredProducts,
    });
  }
  const totalPages = Math.ceil(count / itemsPerPage);

  // Check if the requested page exceeds the total number of pages
  if (page > totalPages && totalPages > 0) {
    // Respond with an error indicating that the page does not exist
    return next(createCustomError("Page Does not Exist", 404));
  }

  // Log the products matching the keyword, category, or brand, and send a response
  console.log(
    `Products matching ${{ ...req.query }} have been called, products length= ${
      products.length
    }`
  );
  res.status(200).json({
    success: true,
    message: "Operation successful",
    pagination: {
      currentPage: page,
      itemsPerPage: itemsPerPage,
      totalProducts: count, // Update to use filtered count
      totalPages: totalPages, // Update to use filtered count
    },
    data: products,
  });
});

/**
 * Retrieves all ratingRevies for a product from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const getProductRatingReviews = asyncWrapper(async (req, res, next) => {
  // Extract product ID from request parameters
  const productId = Number(req.params.id);

  // Find the product by ID in the database
  const product = await Product.findByPk(productId);

  // If the product is not found, invoke the next middleware with a custom error
  if (!product) {
    return next(
      createCustomError(`No product with id: ${productId} is found`, 404)
    );
  }

  // Fetch all ratingReviews associated with the product
  const ratingReviews = await RatingReview.findAll({ where: { productId } });

  // Send a response with product and associated ratingReviews
  return res.json({
    success: true,
    message: "Product and RatingReview fetched successfully",
    data: { product: productId, ratingReviews: ratingReviews },
  });
});

// Export the API functions
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductRatingReviews,
  getAllProducts,
};
