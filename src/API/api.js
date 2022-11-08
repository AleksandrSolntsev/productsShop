export const clearEmptyFields = (obj) =>
  Object.keys(obj)
    .filter((k) => obj[k])
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});

export const buildURLQuery = (data) => {
  return Object.entries(clearEmptyFields(data))
    .map((pair) => (pair[1] ? pair.map(encodeURIComponent).join("=") : ""))
    .join("&");
};

export const dataApi = {
  login(email, password) {
    return fetch(
      `http://dummy-api.d0.acom.cloud/api/auth/login?email=${email}&password=${password}`,
      { method: "post" }
    );
  },
  getProducts(currentPage) {
    let token = localStorage.getItem("token");
    return fetch(
      `http://dummy-api.d0.acom.cloud/api/products?page=${currentPage}`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      }
    );
  },
  getProductsFilters(filtersData) {
    let token = localStorage.getItem("token");
    const qParams = {
      page: filtersData.page,
      title: filtersData.fname,
      from: filtersData.ffdate,
      to: filtersData.ftdate,
      price_to: filtersData.ftprice,
      price_from: filtersData.ffprice,
    };
    console.log("filtersData", filtersData);
    return fetch(
      `http://dummy-api.d0.acom.cloud/api/products?${buildURLQuery(qParams)}`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      }
    );
  },
  getProfile() {
    let token = localStorage.getItem("token");
    return fetch(`http://dummy-api.d0.acom.cloud/api/auth/user-profile`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
    });
  },
  LogOff() {
    let token = localStorage.getItem("token");
    return fetch(`http://dummy-api.d0.acom.cloud/api/auth/logout`, {
      method: "post",
      Authorization: "Bearer " + `${token}`,
    });
  },
};
