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

export {
  getSingleProduct,
  getAllProducts,
};
