import { DEFAULT_AVATAR } from '@/constants';

async function efetch(url, options = {}) {
  let result = {};
  let json = {};

  try {
    result = await fetch(url, options);
    json = await result.json();
  } catch (error) {
    throw new Error(error.message);
  }

  if (!result.ok || json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data;
}

function makeProductsService() {
  const baseUrl = '/api/v1/products';

  async function fetchProducts(page, limit = 10) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    const data = await efetch(url);
    data.products = data.products.map((product) => {
      return {
        ...product,
        avatar: product.avatar ?? DEFAULT_AVATAR
      };
    });

    return data;
  }

  async function fetchProduct(id_sp) {
    const { product } = await efetch(`${baseUrl}/${id_sp}`);
    return {
      ...product,
      avatar: product.avatar ?? DEFAULT_AVATAR
    };
  }

  async function createProduct(product) {
    return efetch(baseUrl, {
      method: 'POST',
      body: product
    });
  }

  async function deleteAllProducts() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  async function updateProduct(id_sp, product) {
    return efetch(`${baseUrl}/${id_sp}`, {
      method: 'PUT',
      body: product
    });
  }

  async function deleteProduct(id_sp) {
    return efetch(`${baseUrl}/${id_sp}`, {
      method: 'DELETE'
    });
  }

  return {
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
  };
}

export default makeProductsService();
