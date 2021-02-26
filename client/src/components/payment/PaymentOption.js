import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Button,Container,Row,Col} from 'reactstrap'
import { withRouter } from 'react-router-dom';
import AppleIcon from '../../Assests/icons/apple.png'
import PaypalIcon from '../../Assests/icons/paypal.png'
import { submitOrder } from '../../actions/cart';
import generateUserReceipt from '../../utils/generateUserReceipt'





export const PaymentOption = ({history,paymentInfo,submitOrder,cart,user}) => {

    const [isChosen,setIsChosen] = useState("")
    const [paymentMode,setPaymentMode]= useState("")
    const [isPaid,setIsPaid] = useState(false)

const chosenPayment = () =>{
    if(isChosen==="paypal"){
        return(<Container><Row className="justify-content-center"><p>You chose Paypal as the payment option. Do you want to make the order?</p></Row><Row className="justify-content-center"><Button className="mr-2" color="success" onClick={()=>placeOrder("paypal")} >Yes</Button><Button color="danger" onClick={()=>setIsChosen("")}>No</Button></Row></Container>)
    }else if(isChosen==="applepay"){
        return(<Container><Row className="justify-content-center"><p>You chose ApplePay as the payment option. Do you want to make the order?</p></Row><Row className="justify-content-center"><Button className="mr-2" color="success" onClick={()=>{placeOrder("applepay")}} >Yes</Button><Button color="danger" onClick={()=>setIsChosen("")}>No</Button></Row></Container>)

    }
}

const placeOrder = (paymentOption) =>{
    setPaymentMode(paymentOption)

    //Destructure props
    const {timeRange,car,note} = paymentInfo

    const orderInfo = {}
    if(timeRange) orderInfo.pickup_time = timeRange

    if(car) orderInfo.car_description = car

    if(note) orderInfo.notes = note

    if(paymentOption) orderInfo.payment = paymentOption


    submitOrder(orderInfo)
    setIsPaid(true)

        



}


const submitPayment = () =>{
    //Print confirmation and receipt 
    if(isPaid){
        return(
            <Container><Row className="mt-4 justify-content-center"><h2 class="text-success">Your order is confirmed!</h2></Row>
            <Row className="mt-2 justify-content-center"><Button onClick={()=>generateUserReceipt(user,cart,paymentInfo,paymentMode)}>Print Receipt</Button>
            <Button className="ml-2 " color="warning" onClick={()=>{history.push("/menu")}}>Back to Menu</Button></Row>
            </Container>
        )
    }
    else if (isPaid===false){
        return(
<Container className="mt-4">
            <Row className="justify-content-center"><h2>Payment</h2></Row>
            <Row className="justify-content-center"><button type="button" class="btn w-25" onClick={()=>setIsChosen("paypal")}><img src={PaypalIcon} class="w-100" alt="Paypal Icon"></img></button>
            <button type="button" class="btn w-25" onClick={()=>setIsChosen("applepay")}><img src={AppleIcon} class="w-100" alt="ApplePay Icon"></img></button></Row>

            <Row><Col>{chosenPayment()}</Col></Row>

            </Container>
        )
    }
}

    return (
        <div>
            
            {submitPayment()}
            
        </div>
    )
}

const mapStateToProps = (state) =>{

}

const mapFunctionsToProps = {
    submitOrder,
}

export default connect(mapStateToProps, mapFunctionsToProps)(withRouter(PaymentOption))
