import React, { Fragment, useState } from 'react';
import OrderItems from './OrderItems';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge,
} from 'reactstrap';

const Order = ({ order, update }) => {
  const {
    _id,
    priority,
    completed,
    total,
    items,
    note,
    user: { name, email, phone },
  } = order;

  const [inEdit, setInEdit] = useState(false);
  const [prior, setPrior] = useState(priority ? priority : 0);
  const [done, setDone] = useState(completed ? 1 : 0);

  const onChangePrior = (e) => setPrior(parseInt(e.target.value));
  const onChangeStatus = (e) => setDone(parseInt(e.target.value));

  const onSaveChanges = (e) => {
    e.preventDefault();
    update(_id, { priority: prior, completed: done === 1 });
    setInEdit(false);
  };

  return (
    <Card className='mb-4'>
      <CardBody>
        <div className='order-header'>
          <CardTitle tag='h3' className='text-primary'>
            {name} | <span>{phone}</span> | <span>{email}</span>
          </CardTitle>
          <div className='badges'>
            {inEdit ? (
              <Fragment>
                <Form onSubmit={onSaveChanges}>
                  <Row form className='justify-content-end'>
                    <Col lg={6}>
                      <FormGroup>
                        <Input
                          type='select'
                          name='priority'
                          defaultValue={prior}
                          onChange={onChangePrior}
                        >
                          <option value={1}>Low</option>
                          <option value={2}>Medium</option>
                          <option value={3}>High</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Input
                          type='select'
                          name='status'
                          defaultValue={done}
                          onChange={onChangeStatus}
                        >
                          <option value={0}>Preparing</option>
                          <option value={1}>Completed</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <Button
                        outline
                        color='danger'
                        className='inline-button mr-3'
                      >
                        Cancel
                      </Button>
                      <Button color='danger' className='inline-button'>
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Fragment>
            ) : (
              <Fragment>
                <i className='fas fa-edit' onClick={() => setInEdit(true)} />
                <Badge
                  color={
                    prior === 3 ? 'danger' : prior === 2 ? 'primary' : 'dark'
                  }
                >
                  {prior === 3
                    ? 'High priority'
                    : prior === 2
                    ? 'Medium priority'
                    : 'Low priority'}
                </Badge>
                <Badge color={done ? 'success' : 'info'}>
                  {done ? 'Completed' : 'Preparing'}
                </Badge>
              </Fragment>
            )}
          </div>
        </div>
        <CardSubtitle tag='h6' className='mb-2 text-muted'>
          Order #{_id}
        </CardSubtitle>
        {note && <CardText>{note}</CardText>}
        <OrderItems items={items} total={total} />

        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default Order;
