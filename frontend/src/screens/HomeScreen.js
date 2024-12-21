import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useParams, Link } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";

const HomeScreen = () => {
  const { keyword, pageNumber = 1 } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState(null);
  const [sortOption, setSortOption] = useState("");

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (products) {
      let result = [...products];

      // Apply filters
      if (activeFilters) {
        const { priceRange, rating } = activeFilters;

        if (priceRange.min) {
          result = result.filter(
            (product) => product.price >= Number(priceRange.min)
          );
        }
        if (priceRange.max) {
          result = result.filter(
            (product) => product.price <= Number(priceRange.max)
          );
        }
        if (rating) {
          result = result.filter((product) => product.rating >= Number(rating));
        }
      }

      // Apply sorting
      if (sortOption) {
        switch (sortOption) {
          case "price_asc":
            result.sort((a, b) => a.price - b.price);
            break;
          case "price_desc":
            result.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            result.sort((a, b) => b.rating - a.rating);
            break;
          case "newest":
            result.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;
          default:
            break;
        }
      }

      setFilteredProducts(result);
    }
  }, [products, activeFilters, sortOption]);

  const handleFilter = (filters) => {
    setActiveFilters(filters);
  };

  const handleSort = (sortValue) => {
    setSortOption(sortValue);
  };

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <ProductFilter onFilter={handleFilter} onSort={handleSort} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : filteredProducts.length === 0 ? (
        <Message variant="info">No Products Found</Message>
      ) : (
        <>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
