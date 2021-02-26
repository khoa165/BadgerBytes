import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setEditedItem, editItem } from '../../actions/item';
import Spinner from '../layout/Spinner';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  CustomInput,
  Label,
  Button,
} from 'reactstrap';

const ItemEdit = ({ history, item: { currentEdited }, editItem }) => {
  useEffect(() => {
    if (!currentEdited) {
      history.push('/menu');
    }

    // eslint-disable-next-line
  }, []);

  const INITIAL_DATA = {
    item_name: '',
    picture_link: '',
    item_cost: '',
    item_description: '',
    item_category: '',
    item_availability: '',
  };

  const [data, setData] = useState(
    currentEdited
      ? {
          _id: currentEdited._id,
          item_name: currentEdited.item_name,
          picture_link: currentEdited.picture_link,
          item_cost: currentEdited.item_cost,
          item_description: currentEdited.item_description,
          item_category: currentEdited.item_category,
          item_availability: currentEdited.item_availability,
        }
      : INITIAL_DATA
  );

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const onStatusChange = (e) =>
    setData({
      ...data,
      item_availability: e.target.checked ? 'In Stock!' : 'Out of Stock',
    });

  const {
    _id,
    item_name,
    picture_link,
    item_cost,
    item_description,
    item_category,
    item_availability,
  } = data;

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();
    const submittedData = {};
    if (item_name) submittedData.item_name = item_name;
    if (picture_link) submittedData.picture_link = picture_link;
    if (item_cost) submittedData.item_cost = item_cost;
    if (item_description) submittedData.item_description = item_description;
    if (item_category) submittedData.item_category = item_category;
    if (item_availability) submittedData.item_availability = item_availability;
    submittedData._id = _id;
    editItem(history, submittedData, true);
  };
  return !currentEdited ? (
    <Spinner />
  ) : (
    <div>
      <Link className='go-back-link' to='/menu'>
        <i className='fas fa-long-arrow-alt-left mr-3' />
        View menu
      </Link>
      <Row>
        <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
          <h1 className='text-center'>Edit item</h1>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='itemName'>Item name</Label>
              <Input
                id='itemName'
                type='text'
                name='item_name'
                value={item_name}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='itemImageURL'>Item image URL</Label>
              <Input
                id='itemImageURL'
                type='text'
                name='picture_link'
                value={picture_link}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='itemCost'>Item cost</Label>
              <Input
                id='itemCost'
                type='text'
                name='item_cost'
                value={item_cost}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='itemDescription'>Item description</Label>
              <Input
                id='itemDescription'
                type='text'
                name='item_description'
                value={item_description}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='itemCategory'>Item category</Label>
              <Input
                id='itemCategory'
                type='text'
                name='item_category'
                value={item_category}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='itemAvailability'>
                Item availability: {item_availability}
              </Label>
              <CustomInput
                id='itemAvailability'
                type='switch'
                name='item_availability'
                label={
                  item_availability === 'In Stock!'
                    ? 'Turn off to indicate item out of stock!'
                    : 'Turn on to indicate item available'
                }
                onChange={onStatusChange}
                checked={item_availability === 'In Stock!'}
              />
            </FormGroup>
            <Button color='danger'>Submit</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

ItemEdit.propTypes = {
  item: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
  setEditedItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

const mapFunctionsToProps = {
  editItem,
  setEditedItem,
};

export default connect(
  mapStateToProps,
  mapFunctionsToProps
)(withRouter(ItemEdit));
