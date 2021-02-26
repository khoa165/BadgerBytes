import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import '../../styles/Form.scss';

const Register = ({ register, isAuthenticated }) => {
  // Set user data.
  const [user, setUser] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });
  const [staffKey, setStaffKey] = useState('');

  // Destructuring.
  const { name, phone, address, email, password, confirmedPassword } = user;

  // Event listener for change in input fields.
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onChangeKey = (e) => setStaffKey(e.target.value);

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6 || !/\d/.test(password)) {
      toast.error(
        'Password must be at least 6 characters and contain at least a number!'
      );
    } else if (password !== confirmedPassword) {
      toast.error('Passwords do not match!');
    } else {
      const userObj = {
        name,
        phone,
        address,
        email,
        password,
        confirmedPassword,
      };
      if (staffKey && staffKey.length > 0) {
        userObj.staffKey = staffKey;
      }
      register(userObj);
    }
  };

  // Redirect if registered.
  if (isAuthenticated) {
    return <Redirect to='/menu' />;
  }

  return (
    <div>
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <Form onSubmit={onSubmit} className='authenticate-form'>
            <h3 className='text-center text-info mb-4'>Account Register</h3>
            <FormGroup>
              <Input
                type='text'
                name='name'
                value={name}
                placeholder='Please enter your name'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='phone'
                value={phone}
                placeholder='Please enter your phone number'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='address'
                value={address}
                placeholder='Please enter your address'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='email'
                name='email'
                value={email}
                placeholder='Please enter a valid email'
                onChange={onChange}
                autoComplete='new-password'
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='password'
                value={password}
                placeholder='Please enter a secure password'
                onChange={onChange}
                autoComplete='new-password'
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='password'
                name='confirmedPassword'
                value={confirmedPassword}
                placeholder='Please confirm your password'
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='staffKey'
                value={staffKey}
                placeholder='If you are staff, enter staff key'
                onChange={onChangeKey}
                required
              />
            </FormGroup>
            <Input
              type='submit'
              value='Register'
              className='btn-outline-info btn-block submitFormButton'
            />
          </Form>
        </Col>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          <div className='other-account-action'>
            <p className='text-secondary'>Already have an account?</p>
            <Link to='/login' className='text-info ml-2'>
              Sign in
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
