export const apiMiddleware = (store) => (next) => (action) => {
  if (action?.type === "api/call") {
    const BASE_URL = "https://fakestoreapi.com";
    const {
      url,
      method,
      data,
      headers = {},
      onSuccess,
      onError,
      meta = {},
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
          store.dispatch({ type: onSuccess, payload: data });
        }
        if (meta?.onSuccess) {
          meta.onSuccess(data);
        }
      })
      .catch((error) => {
        if (meta?.onError) {
          meta?.onError(error);
        }
      });
  } else {
    next(action);
  }
};
