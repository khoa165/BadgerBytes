import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  Button,
  CardTitle,
  CardText,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { toast } from 'react-toastify';
import { updateUser } from '../../actions/auth';
import '../../styles/Account.scss';

const Account = ({ auth: { loading, user }, updateUser }) => {
  // Set user data.
  const [data, setData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmedNewPassword: '',
  });

  useEffect(() => {
    if (!loading && user) {
      setData(user);
    }
  }, [loading, user]);

  // Destructuring.
  const {
    name,
    phone,
    address,
    email,
    oldPassword,
    newPassword,
    confirmedNewPassword,
  } = data;

  const [inEdit, setInEdit] = useState(false);

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();

    if (newPassword && (newPassword.length < 6 || !/\d/.test(newPassword))) {
      toast.error(
        'Password must be at least 6 characters and contain at least a number!'
      );
    } else if (
      newPassword &&
      confirmedNewPassword &&
      newPassword !== confirmedNewPassword
    ) {
      toast.error('Passwords do not match!');
    } else {
      const userObj = {
        name,
        phone,
        address,
        email,
      };
      if (oldPassword) userObj.oldPassword = oldPassword;
      if (newPassword) userObj.newPassword = newPassword;
      if (confirmedNewPassword)
        userObj.confirmedNewPassword = confirmedNewPassword;
      updateUser(userObj);
    }
    setInEdit(false);
  };

  // Event listener for change in input fields.
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return loading ? (
    <Spinner />
  ) : (
    <div id='account'>
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 4, offset: 4 }}
        >
          {inEdit ? (
            <Form onSubmit={onSubmit} className='authenticate-form'>
              <h3 className='text-center text-info mb-4'>Account Update</h3>
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
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  name='oldPassword'
                  value={oldPassword}
                  placeholder='Please enter your existing password'
                  onChange={onChange}
                  autoComplete='new-password'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  name='newPassword'
                  value={newPassword}
                  placeholder='Please enter a new password'
                  onChange={onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  name='confirmedNewPassword'
                  value={confirmedNewPassword}
                  placeholder='Please confirm your new password'
                  onChange={onChange}
                />
              </FormGroup>
              <Input
                type='submit'
                value='Update'
                className='btn-info btn-block submitFormButton'
              />
              <Button
                block
                outline
                color='info'
                onClick={() => setInEdit(false)}
              >
                Cancel
              </Button>
            </Form>
          ) : (
            <Card body>
              <CardTitle className='text-info' tag='h5'>
                Account information
              </CardTitle>
              {user && user.name && (
                <CardText>
                  <span>Name</span>
                  <span>{user.name}</span>
                </CardText>
              )}
              {user && user.email && (
                <CardText>
                  <span>Email</span>
                  <span>{user.email}</span>
                </CardText>
              )}
              {user && user.phone && (
                <CardText>
                  <span>Phone</span>
                  <span>{user.phone}</span>
                </CardText>
              )}
              {user && user.address && (
                <CardText>
                  <span>Address</span>
                  <span>{user.address}</span>
                </CardText>
              )}
              <Button color='info' onClick={() => setInEdit(true)}>
                Update account
              </Button>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapFunctionsToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapFunctionsToProps)(Account);
