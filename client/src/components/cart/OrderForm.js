import React, {useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import {Button,Container,Row,Form,FormGroup,Label,Input} from 'reactstrap'

const OrderForm = ({history}) => {


    //Input for the form
    //----------

    const [timeRange,setTimeRange] = useState(60);

    const [inputs,setInputs] = useState({
        car:"",
        note:"",
    });

    const {car,note} = inputs;
    //----------
    const onChange = (e) => {
        setInputs({...inputs,[e.target.name] : e.target.value});
    };

    useEffect(() => {
    getTimeRange()
    }, [])

    //If time range is less than 0 or more than 360, return false to prevent the action
    const getTimeRange = () =>{
        if(timeRange-30<30 || timeRange+30>360){
            setTimeRange(60)
            return false}
            
        else
            return true
    }

    const onPaymentClick = ()=>{
        
        history.push({
            pathname: '/payment',
            state:{info:{timeRange,car,note}}
        })
    }

    return (
        <div>
            <Container>
                <h2 class="text-center">Order form</h2>
                <Form >
                    
                    <FormGroup><Label>Pickup range</Label>
                    <Row>
                        <div class="mx-3  border border-2 rounded px-2"><p class=" text-center">{timeRange} minutes</p></div>

                    <Button className="rounded" color="success" size="sm" onClick={()=>(getTimeRange()===false ? toast("Must be more than 30 minutes and less than 6 hours") : setTimeRange(timeRange+30))}>+</Button>
                    <Button className="mx-2 " color="danger" onClick={()=>(getTimeRange()===false ? toast("Must be more than 30 minutes and less than 6 hours") : setTimeRange(timeRange-30))}>-</Button></Row></FormGroup>

                    <FormGroup>
                        <Label>Car description*</Label><Input name="car" value={car} placeholder=" Silver Toyota Corolla " onChange={e=>onChange(e)} required ></Input>
                    <Label>Additional notes*</Label><Input name="note" value={note} placeholder=" Vegetarian options " onChange={e=>onChange(e)} ></Input>
                    </FormGroup>
                    <p>*Optional</p>
                    <Row className="justify-content-end"><Button color="success " onClick={()=>onPaymentClick()}>Make Payment</Button></Row>
                    
                </Form>
            </Container>
        </div>
    )
}



export default withRouter(OrderForm)
