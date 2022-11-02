import React, { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getProductsThunk } from "../../Redux/productsReducer";
import { setFilters } from "../../Redux/productsReducer";
import ShopCard from "./ShopCards/ShopCard";
import styles from "./ShopForm.module.css";

const sortInputs = [
  {
    label: "Filter by name",
    type: "text",
    name: "fname",
    placeholder: "Product",
  },
  { label: "From date", type: "date", name: "ffdate" },
  { label: "To date", type: "date", name: "ftdate" },
  { label: "From price", type: "number", name: "ffprice", placeholder: "$" },
  { label: "To price", type: "number", name: "ftprice", placeholder: "$" },
];

const initialState = sortInputs.reduce((acc, item) => {
  return { ...acc, [item.name]: "" };
}, {});

const ShopForm = () => {
  const products = useSelector((state) => state.products);

  const currentPage = products.currentPage;

  const datas = products.productsList;
  const allPages = products.allPages;
  const dispatch = useDispatch();

  const pagination = [];

  for (let i = 1; i <= allPages; i++) {
    pagination.push(i);
  }

  ////
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = Object.fromEntries(searchParams.entries());

  console.log("filterParams", filterParams);

  const serchQuery =
    searchParams.get("fname", "ffdate", "ftdate", "ffprice", "ftprice") || "";

  useEffect(() => {
    dispatch(getProductsThunk(currentPage));
  }, [currentPage]);

  const setPageHeandler = (value) => {
    dispatch(getProductsThunk(value));
  };

  const [filtersValue, setFiltersValue] = useState(initialState);

  const filterChange = (e) => {
    console.log(filtersValue);
    let names = e.target.name;
    const values = e.target.value;
    setFiltersValue({ ...filtersValue, [names]: values });
  };

  const handleFilter = () => {
    dispatch(setFilters(filtersValue));
  };
  ///////
  const handleClearFilter = () => {
    setSearchParams({ ...filtersValue });
    console.log(serchQuery);
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className={styles.shopMainForm}>
        <div className={styles.filters}>
          {sortInputs.map((input) => (
            <div className={styles.filterInputWrapper} key={input.name}>
              <lable className={styles.inputLabel}>{input.label} :</lable>
              <input
                
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                onChange={filterChange}
                value={filtersValue[input.name]}
              />
            </div>
          ))}
          {/*         
        <div className={styles.dateFilter}>
          <p>From date</p>
          <input
            name="ffdate"
            type="date"
            placeholder=""
            onChange={filterChange}
            value={filtersValue.ffdate}
          />
          <p>To date</p>
          <input
            name="ftdate"
            type="date"
            placeholder=""
            onChange={filterChange}
            value={filtersValue.ftdate}
          />
        </div>

        <div className={styles.priceFilter}>
          <p>From price</p>
          <input
            name="ffprice"
            type="text"
            placeholder="$"
            onChange={filterChange}
            value={filtersValue.ffprice}
          />
          <p>To price</p>
          <input
            name="ftprice"
            type="text"
            placeholder="$"
            onChange={filterChange}
            value={filtersValue.ftprice}
          />
        </div> */}
          <div className={styles.filtersButtons}>
            <button onClick={handleFilter}>Filter!</button>
            <button onClick={handleClearFilter}>Clear Filter</button>
          </div>
        </div>
        <div className={styles.productList}>
          {datas.length > 0 &&
            datas.map((element, item) => (
              <ShopCard
                key={item}
                title={element.title}
                price={element.price}
                thumbnail={element.thumbnail}
              />
            ))}
          <div className={styles.paginationBlock}>
            {pagination.map((value, key) => (
              <ul
                key={key}
                className={(currentPage == value && styles.selectedPage) || ""}
                onClick={() => setPageHeandler(value)}
              >
                {value}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopForm;
