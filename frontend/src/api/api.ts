import axios from "./axios.customize";
interface ProductData {
  barcode: string;
  description: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: string;
}

const test = () => {
  const API_URL = "/users";
  return axios.get(API_URL);
};

const getProductById = (id: string | number) => {
  const API_URL = "/products/" + id;
  return axios.get(API_URL);
};

const getProductByBarcode = (barcode: string | number) => {
  const API_URL = "/products/search/" + barcode;
  return axios.get(API_URL);
};

const createProduct = (data: ProductData) => {
  const API_URL = "/products/create";
  return axios.post(API_URL, data);
};

// const getInforProduct = (barcode: string | number) => {
//   const API_URL = "https://go-upc.com/api/v1/code/" + barcode;
//   return axios.get(API_URL, {
//     headers: {
//       Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
//     },
//   });
// };

export {
  test,
  getProductById,
  getProductByBarcode,
  createProduct,
  // getInforProduct,
};
