import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const OrderForm = ({ history }) => {
  //Input for the form
  //----------

  const [timeRange, setTimeRange] = useState(60);

  const [inputs, setInputs] = useState({
    car: '',
    note: '',
  });

  const { car, note } = inputs;
  //----------
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onPaymentClick = () => {
    history.push({
      pathname: '/payment',
      state: { info: { timeRange, car, note } },
    });
  };

  return (
    <div>
      <Container>
        <h2 className='text-center'>Order form</h2>
        <Form>
          <FormGroup>
            <Label>
              Select number of minutes until pickup (15-min interval increment
              from 30 minutes to 6 hours)
            </Label>
            <Row className='justify-content-center'>
              <Button
                style={{ width: '36px', height: '36px' }}
                className='mx-2 rounded-circle'
                color='danger'
                onClick={() => timeRange >= 45 && setTimeRange(timeRange - 15)}
              >
                -
              </Button>
              <div
                style={{ minWidth: '150px' }}
                className='mx-3 border border-2 rounded px-2'
              >
                <p className='m-0 text-center'>
                  {Math.floor(timeRange / 60) > 0 &&
                    Math.floor(timeRange / 60) + ' hours '}
                  {timeRange % 60 > 0 && (timeRange % 60) + ' minutes'}
                </p>
              </div>

              <Button
                style={{ width: '36px', height: '36px' }}
                className='mx-2 rounded-circle'
                color='success'
                onClick={() => timeRange <= 345 && setTimeRange(timeRange + 15)}
              >
                +
              </Button>
            </Row>
          </FormGroup>

          <FormGroup>
            <Label>Car description*</Label>
            <Input
              name='car'
              value={car}
              placeholder=' Silver Toyota Corolla '
              onChange={(e) => onChange(e)}
              required
            ></Input>
            <Label>Additional notes*</Label>
            <Input
              name='note'
              value={note}
              placeholder=' Vegetarian options '
              onChange={(e) => onChange(e)}
            ></Input>
          </FormGroup>
          <p>*Optional</p>
          <Row className='justify-content-end'>
            <Button color='success ' onClick={() => onPaymentClick()}>
              Make Payment
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(OrderForm);
