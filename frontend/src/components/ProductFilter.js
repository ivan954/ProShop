import React, { useState } from "react";
import { Form, Button, Row, Col, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductFilter = ({ onFilter, onSort }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({ priceRange, rating });
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const handleSort = (value) => {
    setSortBy(value);
    onSort(value);
  };

  const handleClearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setRating("");
    setSortBy("");
    onFilter({ priceRange: { min: "", max: "" }, rating: "" });
    onSort("");
  };

  return (
    <div className="filter-container">
      <div className="d-md-none mb-3">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline-primary"
          className="w-100 d-flex justify-content-between align-items-center"
        >
          <span>Filters & Sort</span>
          <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
        </Button>
      </div>

      <Collapse in={isOpen} className="d-md-block">
        <div>
          <Form onSubmit={submitHandler} className="mb-4">
            <Row>
              <Col lg={9} md={8}>
                <Form.Control
                  type="text"
                  name="q"
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search Products..."
                  className="mr-sm-2"
                ></Form.Control>
              </Col>
              <Col lg={3} md={4}>
                <Button type="submit" variant="primary" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

          <Form onSubmit={handleFilter}>
            <Row>
              <Col lg={3} md={6}>
                <Form.Group className="mb-0">
                  <Form.Label>Price Range</Form.Label>
                  <div className="price-range-container">
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                      min="0"
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                      min="0"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group className="mb-0">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">All Ratings</option>
                    <option value="4">4★ & above</option>
                    <option value="3">3★ & above</option>
                    <option value="2">2★ & above</option>
                    <option value="1">1★ & above</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group className="mb-0">
                  <Form.Label>Sort By</Form.Label>
                  <Form.Control
                    as="select"
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="">Default</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group className="mb-0">
                  <Form.Label>&nbsp;</Form.Label>
                  <div className="d-flex gap-5">
                    <Button type="submit" variant="primary">
                      Apply Filters
                    </Button>
                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={handleClearFilters}
                    >
                      Clear
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </Collapse>
    </div>
  );
};

export default ProductFilter;
