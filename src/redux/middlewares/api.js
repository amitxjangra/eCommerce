export const apiMiddleware = (store) => (next) => (action) => {
  console.log("eaaa", next, action);
  if (action.type === "api/call") {
    const BASE_URL = "https://fakestoreapi.com";
    const {
      url,
      method,
      data,
      headers,
      onSuccess,
      //  onFail
    } = action.payload;
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (method !== "GET" && data) {
      config.body = JSON.stringify(data);
    }
    fetch(`${BASE_URL + url}`, config)
      .then((response) => response.json())
      .then((data) => {
        if (onSuccess) {
          store.dispatch(onSuccess(data));
        }
      })
      .catch((error) => {
        // if (onFail) {
        //   store.dispatch(onFail(error));
        // }
        console.error("Error:", error);
      });
  } else {
    next(action);
  }
};
