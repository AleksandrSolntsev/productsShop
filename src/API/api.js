
export const dataApi = {
  login(email, password) {
    return fetch(
      `http://dummy-api.d0.acom.cloud/api/auth/login?email=${email}&password=${password}`,
      { method: "post" }
    );
    //     .then((response) => response.json());
    // .then(data => console.log(data));
  },
  getData() {
    let token = localStorage.getItem("token");
    return fetch(`http://dummy-api.d0.acom.cloud/api/products?page=1`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
    }).then((response) => response.json());
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
    // .then(response => response.json())
  },
  getProductsFilters() {
    let token = localStorage.getItem("token");

    let { fname, ftprice, ffprice, ftdate, ffdate } = JSON.parse(
      localStorage.getItem("filters")
    );

    return fetch(
      `http://dummy-api.d0.acom.cloud/api/products?from=${ffdate}&to=${ftdate}
      &price_from=${ffprice}&price_to=${ftprice}&title=${fname}`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      }
    );
    // .then(response => response.json())
  },
  getProfile() {
    let token = localStorage.getItem("token");
    return fetch(`http://dummy-api.d0.acom.cloud/api/auth/user-profile`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
    });
    // .then(response => response.json())
  },

  LogOff() {
    let token = localStorage.getItem("token");
    return fetch(`http://dummy-api.d0.acom.cloud/api/auth/logout`, {
      method: "post",
      Authorization: "Bearer " + `${token}`,
    });
    // .then(response => response.json())
  },
};

// sendData(newMyIdea, achievments) {
//   axios({
//     method: "post",
//     url: "http://localhost:5000/postideas",
//     data: [...newMyIdea, ...achievments],
//   });
// },

// getAchivsData() {
//   return axios({
//     method: "get",
//     url: "http://localhost:5000/getideas",
//   }).then(function(response) {
//     return response.data.achivFilter;
//   });
// },
// getIdeasData() {
//   return axios({
//     method: "get",
//     url: "http://localhost:5000/getideas",
//   }).then(function(response) {
//     return response.data.ideasFilter;
//   });
// },
