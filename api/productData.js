const getAllProducts = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5212/api/products/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleProduct = (prodId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5212/api/prodwithtype/${prodId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProduct = (payload) => new Promise((resolve, reject) => {
  fetch('http://localhost:5212/api/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5212/api/products/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllProdTypes = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5212/api/prodtypes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getSingleProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  getAllProdTypes,
};
