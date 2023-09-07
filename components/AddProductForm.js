import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createProduct, getAllProdTypes, updateProduct } from '../api/productData';

export default function AddProductForm({ obj, onUpdate }) {
  const [show, setShow] = useState(false);
  const [prodTypes, setProdTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({
    productTypeId: 0,
    productName: '',
    productPrice: 0,
    userId: user.uid,
  });

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  useEffect(() => {
    getAllProdTypes().then((data) => setProdTypes(data));
  }, []);

  const handleClose = () => {
    setShow(false);
    router.push('/');
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'productPrice' || name === 'productTypeId' ? parseFloat(value) : value; // Convert productPrice and productTypeId to a number
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateProduct(formInput).then(() => {
        router.push('/test');
        handleClose();
      });
    } else {
      const payload = {
        ...formInput,
      };
      console.log('check payload:', payload);
      createProduct(payload).then(() => {
        router.push('/test');
        onUpdate();
        setShow(false);
      });
    }
  };

  return (
    <>
      <Button
        variant="light"
        className=""
        onClick={handleShow}
        style={{ color: 'orange', minWidth: '125px' }}
      >
        {obj.id ? 'Update Product' : 'Add Product'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-black" closeButton>
          <Modal.Title style={{ color: 'orange' }}>{obj.id ? 'Update' : 'Create'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form onSubmit={handleSubmit}>

            {/* Product Name  */}
            <FloatingLabel controlId="floatingInput1" label="Product Name" className="mb-3" style={{ color: 'orange' }}>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                name="productName"
                value={formInput.productName}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Product Type Select  */}
            <FloatingLabel controlId="floatingInput1" label="Product Type" className="mb-3" style={{ color: 'orange' }}>
              <Form.Select
                type="text"
                placeholder="Choose Product Type"
                name="productTypeId"
                value={formInput.productTypeId}
                onChange={handleChange}
                required
              >
                <option>Product Type</option>
                {prodTypes.map((prodtype) => (
                  <option key={prodtype.id} value={prodtype.id}>{prodtype.type}</option>
                ))}
              </Form.Select>
            </FloatingLabel>

            {/* Product Price  */}
            <FloatingLabel controlId="floatingInput3" label="Product Price" className="mb-3" style={{ color: 'orange' }}>
              <Form.Control
                type="number"
                placeholder="Game Session Details"
                name="productPrice"
                value={formInput.productPrice}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <Button className="btn btn-dark" type="submit">{obj.id ? 'Update' : 'Submit'}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

AddProductForm.propTypes = {
  obj: PropTypes.shape({
    productTypeId: PropTypes.number,
    productName: PropTypes.string,
    productPrice: PropTypes.number,
    userId: PropTypes.string,
    id: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};

AddProductForm.defaultProps = {
  obj: {},
  onUpdate: null,
};
