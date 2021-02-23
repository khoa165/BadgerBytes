import React,{useState} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Footer from '../../Components/navigation/footer/footer';

const Payment2 = () => {
    const [dropdownOpen,setDropdownOpen] = useState(false)

    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }
    return (
        <div>
          <section class="mb-4 h-75" style={{height: "100vh"}}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Credit Card</DropdownItem>
              <DropdownItem>Paypal</DropdownItem>
              <DropdownItem>Quo Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </section>
          <Footer />

        </div>
    )
}

export default Payment2
