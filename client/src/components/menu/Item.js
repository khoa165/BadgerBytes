import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setEditedItem, updateAvailability } from '../../actions/item';
import { addToCart } from '../../actions/cart';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CustomInput,
  Label,
} from 'reactstrap';

const Item = ({
  user,
  item,
  history,
  setEditedItem,
  updateAvailability,
  addToCart,
}) => {
  const [num, setNum] = useState(1);
  // Destructure
  const {
    _id,
    item_name,
    item_cost,
    picture_link,
    item_description,
    item_category,
    item_availability,
  } = item;

  const [available, setAvailable] = useState(
    item && item.item_availability && item.item_availability === 'In Stock!'
      ? true
      : false
  );

  const toggle = () => {
    const avai = !available ? 'In Stock!' : 'Out of Stock';
    updateAvailability(_id, avai);
    setAvailable(!available);
  };

  return (
    <Card className='item-card'>
      <CardImg top width='100%' src={picture_link} alt={item_name} />
      <CardBody>
        {user && user && user.admin ? (
          <div className='food-item-title'>
            <CardTitle tag='h5'>
              {item_name} (${item_cost * num})
            </CardTitle>
            <i
              className='fas fa-edit'
              onClick={() => setEditedItem(history, item, true)}
            />
          </div>
        ) : (
          <CardTitle tag='h5'>
            {item_name} (${(item_cost * num).toFixed(2)})
          </CardTitle>
        )}
        <CardSubtitle tag='h6' className='mb-2 text-muted'>
          {item_category}
        </CardSubtitle>
        <CardText>Description: {item_description}</CardText>

        {user && (user.admin || user.staff) ? (
          <div>
            <Label className='m-0' for={_id}>
              Item available: {available ? 'yes' : 'no'}
            </Label>
            <CustomInput
              id={_id}
              type='switch'
              name='available'
              label={
                available
                  ? 'Turn off to indicate item out of stock!'
                  : 'Turn on to indicate item available'
              }
              onChange={toggle}
              checked={available}
            />
          </div>
        ) : item_availability === 'In Stock!' ? (
          <div className='button-group'>
            <QuantityButton num={num} setNum={setNum} />
            <Button color='danger' onClick={() => addToCart(_id, num)}>
              Add to cart
            </Button>
          </div>
        ) : (
          <p className='m-0'>Item not available</p>
        )}
      </CardBody>
    </Card>
  );
};

const QuantityButton = ({ num, setNum }) => {
  return (
    <div className='quant-button'>
      <div
        className='change-quant-icon'
        onClick={() => num > 1 && setNum(num - 1)}
      >
        <i
          className='fas fa-minus'
          onClick={() => num > 1 && setNum(num - 1)}
        />
      </div>
      <Button outline color='primary' className='mx-3'>
        Quantity: {num}
      </Button>
      <div className='change-quant-icon' onClick={() => setNum(num + 1)}>
        <i className='fas fa-plus' />
      </div>
    </div>
  );
};

Item.propTypes = {
  setEditedItem: PropTypes.func.isRequired,
  updateAvailability: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapFunctionsToProps = {
  setEditedItem,
  updateAvailability,
  addToCart,
};

export default connect(mapStateToProps, mapFunctionsToProps)(withRouter(Item));
