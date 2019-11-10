const fetcher = (info: RequestInfo, option: RequestInit = {}) =>
  fetch(info, {
    ...option,
    headers: {
      ...option.headers,
      Authorization: `Bearer ${process.env.REACT_APP_PRODUCT_HUNT_TOKEN}`
    }
  }).then(r => r.json());

export default fetcher;
