import { Component } from 'react'
// import { Carousel } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dishes from '../data/menu.json'
import DishComments from './DishComments'
import ReservationForm from './ReservationForm'

// for showing the comments of a given dish, I need to find a way of SELECTING and
// remembering the last pasta I clicked on
// initially I won't have any selected dish yet, but when I click on one slide
// I will set that pasta to be the selected one, so I can show its reviews
// for remembering a thing over time, we'll need to save a piece of info in
// the component's STATE
// for providing a state, we need a CLASS COMPONENT
// so let's convert Home, which is a function currently, into a class based component

class Home extends Component {

    // initial state
    state = {
        selectedDish: null,
        // every time I click on a slide, from null I will assign a value
        // the value will be one of the pasta objects, depending on what I clicked on!
        // stefano: ''
        title: 'Welcome to Strivestaurant!'
    }

    render() {
        // the PROPS are an object filled with "custom attributes" we enrich our component with
        // upon invokation: so they come from OUTSIDE, they cannot be set inside the component itself
        // the STATE instead is an object we can mantain and set from INSIDE the component, and
        // it's not accessible from outside
        // console.log(this)

        // if (this.props.myFunction) {
        //     this.props.myFunction()
        // }

        // this.props.myFunction && this.props.myFunction()

        // render is ALWAYS MANDATORY in a class component
        return (
            // we should still provide a container
            <Container>
                <Row className="my-4 justify-content-center">
                    <Col xs={12} md={6} className="text-center">
                        <ReservationForm />
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{ marginTop: '1em' }}>
                    <Col xs={12} md={6} className="text-center">
                        <h1>{this.state.title}</h1>
                        <h3 onClick={() => { this.setState({ title: 'Hello Hilary!' }) }}>We can only serve pasta</h3>
                        <Carousel className="mt-4">
                            {
                                dishes.map(dish => (
                                    <Carousel.Item key={dish.id}>
                                        <img
                                            className="d-block w-100"
                                            src={dish.image}
                                            alt="First slide"
                                            onClick={() => this.setState({
                                                selectedDish: dish
                                            })}
                                        />
                                        <Carousel.Caption>
                                            <h3>{dish.name}</h3>
                                            <p>{dish.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Col>
                </Row>
                <Row className="my-4 justify-content-center">
                    <Col xs={12} md={6} className="text-center">
                        <DishComments selectedDish={this.state.selectedDish} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home