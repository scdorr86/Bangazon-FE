import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    fBkey: user.uid,
    isSeller: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('form data:', formData);

    registerUser(formData);
    onUpdate();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Information</Form.Label>

        <Form.Control as="textarea" name="name" required placeholder="Enter your username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

        <FloatingLabel controlId="floatingInput1" label="Are you a Seller?" className="mb-3" style={{ color: 'red' }}>
          <Form.Select
            type="text"
            placeholder="Are you a seller?"
            name="isSeller"
            onChange={({ target }) => {
              const selectedValue = target.value === 'true'; // Convert to boolean
              setFormData((prev) => ({ ...prev, [target.name]: selectedValue }));
            }}
            required
          >
            <option>Are you a seller?</option>
            <option value="true" style={{ color: 'black' }}>Yes</option>
            <option value="false" style={{ color: 'black' }}>No</option>
          </Form.Select>
        </FloatingLabel>

      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RegisterForm;
