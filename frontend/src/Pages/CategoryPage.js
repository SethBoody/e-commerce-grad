import Category from "../Components/Category";
import { useEffect, useState } from "react";
import { searchProduct } from "../Shared/API/FetchData";
import { useSearchParams } from "react-router-dom";

export const CategoryPage = () => {
  const [searchParams] = useSearchParams(window.location.search);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState("Category Name");
  const [loading, setLoading] = useState(false);
  const newArrival = searchParams.get("newArrivals");
  const categoryName = searchParams.get("categoryName");
  const brandName = searchParams.get("brandName");
  const limited = searchParams.get("limited");
  const discount = searchParams.get("discount");
  const popular = searchParams.get("rating");
  const keyword = searchParams.get("keyword");

  const checkParams = () => {
    if (newArrival) {
      setCategoryTitle("New Arrivals");
      searchParams.delete("newArrivals");
    }
    if (categoryName) {
      setCategoryTitle(categoryName);
    }
    if (brandName) {
      setCategoryTitle(brandName);
    }
    if (keyword) {
      setCategoryTitle("You search for: '" + keyword + "'");
    }
    return categoryTitle;
  };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const pageChangeHandler = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setLoading(true);
    checkParams();
    const queryParams = {
      newArrival,
      categoryName,
      brandName,
      limited,
      discount,
      popular,
      keyword,
      page: currentPage,
    };
    const query = Object.fromEntries(
      Object.entries(queryParams).filter(([_, v]) => v !== null)
    );
    searchProduct(query)
      .then((response) => {
        setCategoryProduct(response.data);
        setTotalPages(response.pagination.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error in fetching data", error);
      });
  }, [
    newArrival,
    categoryName,
    discount,
    popular,
    brandName,
    currentPage,
    keyword,
    limited,
  ]);

  return (
    <Category
      loading={loading}
      categoryTitle={categoryTitle}
      currentPage={currentPage}
      totalPages={totalPages}
      categoryProduct={categoryProduct}
      onNext={onNext}
      pageChangeHandler={pageChangeHandler}
    />
  );
};
