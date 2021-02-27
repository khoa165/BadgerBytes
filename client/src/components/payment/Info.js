import React from 'react'
import {Row} from 'reactstrap'

function Info({pickupInfo}) {
    //Destructure
    const {timeRange,car,note} = pickupInfo


    return (
        <div>
            
                <Row className="text-center"><h5>Pickup time: </h5><h5 className="ml-2">In {timeRange} minutes</h5></Row>
                <Row><h5>Car description: </h5><h5 className="ml-2">{car !=="" ? car :" N/A"}</h5></Row>
                <Row><h5>Your notes: </h5><h5 className="ml-2">{note !== "" ? note : "N/A"}</h5></Row>
            
        </div>
    )
}

export default Info
