import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearEmptyFields } from "../../API/api";

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
  const dispatch = useDispatch();

  const {
    currentPage,
    allPages,
    productsList: datas,
  } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams("");
  const [filtersValue, setFiltersValue] = useState(initialState);

  const handleFilter = () => {
    console.log(clearEmptyFields(filtersValue));
    setSearchParams({ ...clearEmptyFields(filtersValue), page: currentPage });
  };

  useEffect(() => {
    if (!searchParams.toString().length) {
      dispatch(getProductsThunk(currentPage));
    } else {
      const filterParams = Object.fromEntries(searchParams.entries());

      setFiltersValue((prev) => ({
        ...prev,
        ...filterParams,
      }));

      dispatch(
        setFilters({
          ...filterParams,
        })
      );
    }
  }, [searchParams]);

  const pagination = [];
  for (let i = 1; i <= allPages; i++) {
    pagination.push(i);
  }

  const filterChange = (e) => {
    let names = e.target.name;
    const values = e.target.value;
    setFiltersValue({ ...filtersValue, [names]: values });
  };
  const setPageHeandler = (value) => {
    setSearchParams((prev) => {
      return { ...Object.fromEntries(prev.entries()), page: value };
    });
  };

  const handleClearFilter = () => {
    setFiltersValue(initialState);
    setSearchParams("");
  };
  return (
    <div>
      <h2>Product List</h2>
      <div className={styles.shopMainForm}>
        <div className={styles.filters}>
          {sortInputs.map((input) => (
            <div className={styles.filterInputWrapper} key={input.name}>
              <label className={styles.inputLabel}>{input.label} :</label>
              <input
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                onChange={filterChange}
                value={filtersValue[input.name]}
              />
            </div>
          ))}
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
                className={(currentPage === value && styles.selectedPage) || ""}
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
