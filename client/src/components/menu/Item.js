import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setEditedItem } from '../../actions/item';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

const Item = ({ auth: { user }, item, history, setEditedItem }) => {
  const [num, setNum] = useState(1);

  const {
    item_name,
    item_cost,
    picture_link,
    item_description,
    item_category,
  } = item;
  return (
    <Card className='item-card'>
      <CardImg top width='100%' src={picture_link} alt={item_name} />
      <CardBody>
        {user && user.admin ? (
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
            {item_name} (${item_cost * num})
          </CardTitle>
        )}
        <CardSubtitle tag='h6' className='mb-2 text-muted'>
          {item_category}
        </CardSubtitle>
        <CardText>Description: {item_description}</CardText>
        <div className='button-group'>
          <QuantityButton num={num} setNum={setNum} />
          <Button color='danger'>Add to cart</Button>
        </div>
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
  auth: PropTypes.object.isRequired,
  setEditedItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapFunctionsToProps = {
  setEditedItem,
};

export default connect(mapStateToProps, mapFunctionsToProps)(withRouter(Item));
