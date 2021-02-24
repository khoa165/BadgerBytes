import React,{useState} from 'react'
import { Container,Row,Col,Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Form, FormGroup, Label, Input, FormText,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Toolbar from '../../Components/navigation/toolbar/toolbar';
import Footer from '../../Components/navigation/footer/footer';
import paypalIcon from '../../Assests/icons/paypalbutton.png';
import jsPDF from 'jspdf'
import item from '../../Components/Order/Items/Item/item';


const Payment = (props) => {

  
  



  

  const [paid, setPaid] = useState(false);


      function Payment(){

        let k = 0;
        props.data.map(element=>k+=element.price*element.counter)

        const handleClick = () => {
          setPaid(true)
        }

        // Generating pdf receipt. Refer to this link : https://www.positronx.io/react-pdf-tutorial-generate-pdf-in-react-with-jspdf/
        const generatePDF = () => {
          const doc = new jsPDF('p', 'pt');
          let yAxis = 60;

          doc.setFont('helvetica')
          doc.text(20, 20, 'Your order is confirmed!')
            doc.text(20, yAxis, 'Item Name' )
            doc.text(200, yAxis, 'Quantity' )
            doc.text(300, yAxis, 'Price' )

          
            props.data.map((item,index)=>{
              doc.text(20, yAxis*(index+2), item.head )
            doc.text(200, yAxis*(index+2), item.counter.toString() )
            doc.text(300, yAxis*(index+2), item.price.toString() )
        
})
                 

            
          
          doc.save('Receipt.pdf')
        }

      //TODO: Set the item to its item, quantity, and price. E.g. item.name, item.quantity
      const paymentSummary = (
        <div>
        <Container className="mt-2 w-50 border border-2 rounded shadow">
          <Row><Col><h2>Payment Summary</h2></Col></Row>
          <Row className="justify-content-center"><Col xs={4}><p>Item</p></Col>
          <Col xs={4}><p>Quantity</p></Col>
          <Col xs={4}><p>Price</p></Col>
          </Row>
          {props.data.map(item=>(<Row className="justify-content-center">
            <Col  xs={4}><p>{item.head}</p></Col>
            <Col  xs={4}><p>{item.counter}</p></Col>
            <Col  xs={4}><p>&#36; {item.price}</p></Col>

          </Row>))}
          <Row className="mt-3"><Col xs={8}></Col><Col xs={4}><p class="fw-bold">Total: &#36; {k}</p></Col></Row>
          
          
        </Container>
        
        <div class="mt-5">
          <button type="button" class="btn" onClick={()=>handleClick()}><img src={paypalIcon} class=" w-50"></img></button>
          <p>*You will be redirected to your Paypal Account</p>
        </div>
        </div>
      )

        const paymentConfirmation = (<div><Container className="mt-2 w-50 border border-2 rounded shadow">
          <Row><Col><h2>Payment Confirmation</h2></Col></Row>
          <Row className="justify-content-center text-success"><p>You have successfully made a payment!</p></Row>
          <Row className="justify-content-center"><Col  xs={4}><p>Item</p></Col>
          <Col  xs={4}><p>Quantity</p></Col>
          <Col  xs={4}><p>Price</p></Col>
          </Row>
          {props.data.map(item=>(<Row className="justify-content-center">
            <Col  xs={4}><p class="fw-bolder">{item.head}</p></Col>
            <Col  xs={4}><p>{item.counter}</p></Col>
            <Col  xs={4}><p>&#36; {item.price}</p></Col>
    
          </Row>))}
          <Row class="mt-2"><Col xs={8}></Col><Col xs={4}><p class="fw-bold">Total: &#36; {k}</p></Col></Row>
          
          
        </Container><Button className="mt-2" onClick={()=>generatePDF()} type="primary">Print Receipt</Button></div>)




        if(paid===true){
          return paymentConfirmation
        }else if (paid===false){
          return paymentSummary
        }
      }

      


    return (
        <div>
          <section className="Order">
                        
                        
                        <div>
                        <Toolbar count={props.count} />
                        <p class="mt-3" className="PaymentHead">Payment</p>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/menu">Menu</NavLink>
                            <NavLink to="/order">Order Online</NavLink>
                        </div>
                    </section>
                    
          <section class="mb-4 h-75" >
            
            <Payment />
            
          </section>

          {/* <Footer /> */}

        </div>
    )
}

export default Payment
