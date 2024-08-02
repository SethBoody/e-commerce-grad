import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
  Tooltip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Back from "../Assets/back.jpeg";
import { useNavigate } from "react-router-dom";
import { BACKUP_HOST } from "../Shared/API/apis";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { deleteProduct } from "../Shared/API/FetchData";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginBottom: "8px",
          fontSize: "0.75rem", // Small button size
        },
      },
    },
  },
});

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [updateProductObj, setUpdateProductObj] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refetchData, setRefetchData] = useState([]);
  const [newProductObj, setNewProductObj] = useState({}); // New Product state
  const [openAddDialog, setOpenAddDialog] = useState(false); // Add Product Dialog state

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchData(user.id);
    }
  }, [refetchData]);

  const fetchData = async (id, page) => {
    try {
      const { data: userData } = await axios.get(`${BACKUP_HOST}/users/${id}`);
      if (userData.success) {
        setProfile(userData.data);
      }
      // Fetch orders
      const { data: orderData } = await axios.get(
        `${BACKUP_HOST}/orders?userId=${id}`
      );
      // Fetch Products if admin
      if (user.user.role === "admin") {
        const { data: brandsData } = await axios.get(`${BACKUP_HOST}/brands`);
        const { data: categories } = await axios.get(
          `${BACKUP_HOST}/categories`
        );
        const { data: productData } = await axios.get(
          `${BACKUP_HOST}/products/all`
        );
        setBrands(brandsData.data || []);
        setCategories(categories.data || []);
        setProducts(productData.data || []);
      }
      setOrders(orderData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const { data: updateData } = await axios.put(
        `${BACKUP_HOST}/users/${profile.id}`,
        profile
      );
      if (updateData.success) {
        setProfile(updateData.data);
        setIsEditing(false);
        enqueueSnackbar("Profile updated successfully", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Something went Wrong, Please Try Again!", {
        variant: "error",
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleProductEditClick = (id) => {
    setUpdateProductObj({});
    setSelectedProductId(id);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setDeleteConfirmationOpen(true);
  };

  console.log(orders);

  const handleDeleteConfirm = () => {
    deleteProduct(selectedProductId)
      .then(() => {
        enqueueSnackbar("Product Deleted successfully", {
          variant: "success",
        });
        setRefetchData(!refetchData);
      })
      .catch(() => {
        enqueueSnackbar("Product Deletion Failed", {
          variant: "error",
        });
      });
    setDeleteConfirmationOpen(false);
  };

  const handleDisplayClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenAddDialog = () => {
    setNewProductObj({});
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateProductObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setNewProductObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = async () => {
    try {
      const { data: updateData } = await axios.put(
        `${BACKUP_HOST}/products/${selectedProductId}`,
        updateProductObj
      );
      if (updateData.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProductId ? updateData.data : product
          )
        );
        enqueueSnackbar("Product updated successfully", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error updating product", {
        variant: "error",
      });
    }
    setOpenEditDialog(false);
  };

  const handleAddFormSubmit = async () => {
    if (
      !newProductObj.title ||
      !newProductObj.description ||
      !newProductObj.brandId ||
      !newProductObj.categoryId ||
      !newProductObj.availableInStock ||
      !newProductObj.imageUrl ||
      !newProductObj.price
    ) {
      enqueueSnackbar("Please fill all fields", {
        variant: "error",
      });
      return;
    }

    try {
      const { data: addData } = await axios.post(
        `${BACKUP_HOST}/products`,
        newProductObj
      );
      if (addData.success) {
        enqueueSnackbar("Product added successfully", {
          variant: "success",
        });
        setRefetchData(!refetchData);
      }
    } catch (error) {
      enqueueSnackbar("Error adding product", {
        variant: "error",
      });
    }
    setOpenAddDialog(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "table-head",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 3,
      headerClassName: "table-head",
    },
    brands?.length > 0 && {
      field: "brandId",
      headerName: "Brand",
      flex: 1.5,
      headerClassName: "table-head",
      valueGetter: (params) => {
        return brands.find((brand) => brand.id === params).name;
      },
    },
    categories?.length > 0 && {
      field: "categoryId",
      headerName: "Category",
      flex: 1.5,
      headerClassName: "table-head",
      valueGetter: (params) => {
        return categories.find((category) => category.id === params).name;
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1.1,
      headerClassName: "table-head",
      valueGetter: (params) => {
        return `$${Number(params).toFixed(2)}`;
      },
    },
    {
      field: "options",
      headerName: "Options",
      flex: 3,
      renderCell: (params) => (
        <Stack direction={"row"} gap={1}>
          <Tooltip title="Edit">
            <span>
              <Button
                variant="contained"
                onClick={() => handleProductEditClick(params.row.id)}
              >
                <EditIcon />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Delete">
            <span>
              <Button
                variant="contained"
                style={{ backgroundColor: "red" }}
                onClick={() => handleDeleteClick(params.row.id)}
              >
                <DeleteIcon />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Display">
            <span>
              <Button
                variant="contained"
                style={{ backgroundColor: "green" }}
                onClick={() => handleDisplayClick(params.row.id)}
              >
                <VisibilityIcon />
              </Button>
            </span>
          </Tooltip>
        </Stack>
      ),
    },
  ].filter(Boolean);

  return (
    <Box sx={{ backgroundImage: `url(${Back})`, py: 2, m: 0 }}>
      <Stack flexDirection={"row"} gap={3}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            py: 2,
            backgroundColor: "white",
            borderRadius: 5,
            marginRight: 0,
            marginLeft: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: 2,
            }}
          >
            {profile && (
              <>
                <Avatar
                  src={profile.imageUrl}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h5" component="h1">
                  {profile.fullName}
                </Typography>
                <TextField
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  fullWidth
                  sx={{ my: 1 }}
                  InputProps={{ readOnly: !isEditing }}
                />
                <TextField
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  fullWidth
                  sx={{ my: 1 }}
                  InputProps={{ readOnly: !isEditing }}
                />
                {profile.role !== "admin" && (
                  <TextField
                    label="Email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    fullWidth
                    sx={{ my: 1 }}
                    InputProps={{ readOnly: !isEditing }}
                  />
                )}
                <TextField
                  label="Date of Birth"
                  type="date"
                  value={
                    profile.dateOfBirth ? profile.dateOfBirth.split("T")[0] : ""
                  }
                  onChange={(e) =>
                    setProfile({ ...profile, dateOfBirth: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ my: 1 }}
                  InputProps={{ readOnly: !isEditing }}
                />
                <TextField
                  label="Mobile"
                  value={profile.mobile}
                  onChange={(e) =>
                    setProfile({ ...profile, mobile: e.target.value })
                  }
                  fullWidth
                  sx={{ my: 1 }}
                  InputProps={{ readOnly: !isEditing }}
                />
                {isEditing && profile.role !== "admin" && (
                  <TextField
                    label="imageUrl"
                    value={profile.imageUrl}
                    onChange={(e) =>
                      setProfile({ ...profile, imageUrl: e.target.value })
                    }
                    fullWidth
                    sx={{ my: 1 }}
                    InputProps={{ readOnly: !isEditing }}
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProfileUpdate}
                  sx={{ display: isEditing ? "block" : "none" }}
                >
                  Update Profile
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEditClick}
                  sx={{ mt: 2 }}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </>
            )}
          </Box>
        </Container>

        {/* Order Tracking Section */}
        {profile?.role !== "admin" && (
          <Container
            component="main"
            maxWidth="md"
            sx={{ py: 2, backgroundColor: "white", borderRadius: 5 }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Track Orders
            </Typography>
            {orders.length === 0 ? (
              <Typography variant="body1">No orders found</Typography>
            ) : (
              <Grid container spacing={2}>
                {orders.map((order) => (
                  <Grid item xs={12} key={order.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Order #{order.id}</Typography>
                        <Typography variant="body2">
                          Status: {order.status}
                        </Typography>
                        <Typography variant="body2">
                          Total: ${order.totalPrice}
                        </Typography>
                        <Typography variant="body2">
                          Date: {new Date(order.date).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        )}

        {profile?.role === "admin" && (
          <Stack gap={2} width="100%" sx={{ backgroundColor: "white" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                margin: "10px 10px 0px 10px",
                maxWidth: "150px",
                height: "50px",
                borderRadius: 5,
                color: "white",
              }}
              onClick={handleOpenAddDialog}
            >
              Add Product
            </Button>

            {/* Display Products Section */}
            {brands && categories && products && profile?.role === "admin" && (
              <>
                <ThemeProvider theme={theme}>
                  <DataGrid
                    rows={products}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    checkboxSelection
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    sx={{
                      bgcolor: "white",
                      flex: 1,
                      marginBottom: "20px",
                      minHeight: "200px",
                      overflowX: "hidden",
                      "& .MuiDataGrid-cell": {
                        fontFamily: "Inter",
                        fontSize: "17px",
                        fontWeight: "400",
                        letterSpacing: "0em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      "& .MuiDataGrid-row": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      "& .MuiDataGrid-columnHeaderTitleContainer": {
                        fontFamily: "Inter",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      "& .MuiDataGrid-virtualScroller": {
                        overflowX: "hidden",
                      },
                      "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: 600,
                      },
                      "& .MuiDataGrid-footerContainer": {
                        direction: "initial",
                      },
                      "& .table-head": {
                        backgroundColor: "white",
                      },
                    }}
                  />
                </ThemeProvider>

                {/* Edit Dialog */}
                <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogContent>
                    Edit Product
                    <FormControl fullWidth sx={{ my: 1 }}>
                      <InputLabel id="brandId">Brand</InputLabel>
                      <Select
                        labelId="brandId"
                        id="brandId"
                        name="brandId"
                        value={
                          updateProductObj.brandId ||
                          products?.find(
                            (item) => item.id === selectedProductId
                          )?.brandId
                        }
                        onChange={handleEditFormChange}
                      >
                        {brands.map((brand) => (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 1 }}>
                      <InputLabel id="categoryId">Category</InputLabel>
                      <Select
                        labelId="categoryId"
                        id="categoryId"
                        name="categoryId"
                        value={
                          updateProductObj.categoryId ||
                          products.find((item) => item.id === selectedProductId)
                            ?.categoryId
                        }
                        onChange={handleEditFormChange}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Title"
                      name="title"
                      value={
                        updateProductObj.title ||
                        products.find((item) => item.id === selectedProductId)
                          ?.title
                      }
                      onChange={handleEditFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={
                        updateProductObj.description ||
                        products.find((item) => item.id === selectedProductId)
                          ?.description
                      }
                      onChange={handleEditFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="ImageUrl"
                      name="imageUrl"
                      value={
                        updateProductObj.imageUrl ||
                        products.find((item) => item.id === selectedProductId)
                          ?.imageUrl
                      }
                      onChange={handleEditFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      value={
                        updateProductObj.price ||
                        products.find((item) => item.id === selectedProductId)
                          ?.price
                      }
                      onChange={handleEditFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                      inputProps={{ min: "1" }}
                    />
                    <TextField
                      label="AvailableInStock"
                      name="availableInStock"
                      type="number"
                      value={
                        updateProductObj.availableInStock ||
                        products.find((item) => item.id === selectedProductId)
                          ?.availableInStock
                      }
                      onChange={handleEditFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                      inputProps={{ min: "1" }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleEditFormSubmit} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* Add Product Dialog */}
                <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                  <DialogTitle>Add Product</DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth sx={{ my: 1 }}>
                      <InputLabel id="brandId">Brand</InputLabel>
                      <Select
                        labelId="brandId"
                        id="brandId"
                        name="brandId"
                        value={newProductObj.brandId || ""}
                        onChange={handleAddFormChange}
                      >
                        {brands.map((brand) => (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 1 }}>
                      <InputLabel id="categoryId">Category</InputLabel>
                      <Select
                        labelId="categoryId"
                        id="categoryId"
                        name="categoryId"
                        value={newProductObj.categoryId || ""}
                        onChange={handleAddFormChange}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Title"
                      name="title"
                      value={newProductObj.title || ""}
                      onChange={handleAddFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="Description"
                      name="description"
                      value={newProductObj.description || ""}
                      onChange={handleAddFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="ImageUrl"
                      name="imageUrl"
                      value={newProductObj.imageUrl || ""}
                      onChange={handleAddFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      value={newProductObj.price || ""}
                      onChange={handleAddFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                      inputProps={{ min: "1" }}
                    />
                    <TextField
                      label="AvailableInStock"
                      name="availableInStock"
                      type="number"
                      value={newProductObj.availableInStock || ""}
                      onChange={handleAddFormChange}
                      fullWidth
                      sx={{ my: 1 }}
                      inputProps={{ min: "1" }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleAddFormSubmit} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog
                  open={deleteConfirmationOpen}
                  onClose={() => setDeleteConfirmationOpen(false)}
                >
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete this product?
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setDeleteConfirmationOpen(false)}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
