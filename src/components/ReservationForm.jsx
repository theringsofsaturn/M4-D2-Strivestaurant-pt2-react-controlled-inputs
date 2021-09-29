import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// name -> string
// phone -> string | number
// numberOfPeople -> string | number
// smoking -> boolean
// dateTime -> string
// specialRequests -> string

class ReservationForm extends React.Component {

    state = {
        reservation: {
            name: '',
            phone: '',
            numberOfPeople: 1,
            smoking: false,
            dateTime: '',
            specialRequests: '',
        },
    }

    handleInput = (propertyName, value) => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                [propertyName]: value
            }
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        // now how can we access the form input value?
        console.log(this.state.reservation)
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/rafael', {
                method: 'POST',
                body: JSON.stringify(this.state.reservation),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            console.log(response)
            if (response.ok) {
                alert('Reservation successfully saved!')
                this.setState({
                    // this is the initial state of my form!
                    reservation: {
                        name: '',
                        phone: '',
                        numberOfPeople: 1,
                        smoking: false,
                        dateTime: '',
                        specialRequests: '',
                    }
                })
            } else {
                alert('Something went wrong :(')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <>
                <h2>BOOK YOUR TABLE HERE</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Your name</Form.Label>
                        <Form.Control
                            // onChange={
                            //     // this will happen every time I input a keystroke
                            //     e => this.setState({
                            //         reservation: {
                            //             ...this.state.reservation,
                            //             // with the ... your making a copy of all the properties
                            //             // already existing into this.state.reservation
                            //             name: e.target.value
                            //             // and then you're just overwriting ONE property
                            //         }
                            //     })}
                            onChange={e => this.handleInput('name', e.target.value)}
                            value={this.state.reservation.name}
                            type="text"
                            placeholder="Enter your name here"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Your phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your phone here"
                            value={this.state.reservation.phone}
                            onChange={e => this.handleInput('phone', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>How many people?</Form.Label>
                        <Form.Control
                            as="select"
                            value={this.state.reservation.numberOfPeople}
                            onChange={e => this.handleInput('numberOfPeople', e.target.value)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            checked={this.state.reservation.smoking}
                            type="checkbox"
                            onChange={e => this.handleInput('smoking', e.target.checked)}
                            label="Do you smoke?" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date and Time</Form.Label>
                        <Form.Control
                            value={this.state.reservation.dateTime}
                            onChange={e => this.handleInput('dateTime', e.target.value)}
                            type="datetime-local" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Any special request?</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            onChange={e => this.handleInput('specialRequests', e.target.value)}
                            value={this.state.reservation.specialRequests}
                            type="text"
                            placeholder="Enter your special requests here" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }
}

export default ReservationForm