import React, { useState , useContext} from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, Button ,InputGroup, Input} from 'reactstrap';
import AppContext from "./context"
import Cart from "../components/cart"

const Restaurant = ({ restaurant, dishes }) => {
  const {addItem} = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los platos según el término de búsqueda
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const backgroundImageStyle = {
    backgroundImage: `url(http://localhost:1337${restaurant.image.url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "300px", // Ajusta la altura según tus necesidades
  };
  
  return (
    <>

      <Container className="py-5 text-center" style={backgroundImageStyle}>
        <Row>
          <Col lg={6} md={8} className="mx-auto">
            <h1 className="fw-light" style={{ color: 'white' }} >{restaurant.name}</h1>
            <p className="lead text-body-secondary" style={{ color: 'white' }}>
              {restaurant.description}
            </p>

          </Col>
        </Row>
      </Container>

      <hr className="bg-body-secondary" style={{ height: '2px' , marginBottom:"50px"}} />

      <InputGroup className="mx-auto" style={{ maxWidth: '300px'}}>
          <Input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
      </InputGroup><br></br>


      <Container className="album py-5 bg-body-tertiary">
        <Row>
          {/* Mostrar las tarjetas de los platos (dishes) después de filtrar */}
          {filteredDishes.map((dish) => (
          <Col md={4} key={dish.id}>
            <Card className="shadow-sm" style={{ marginBottom: '30px' }}>
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <CardImg top width="100%" src={`http://localhost:1337${dish.image.url}`} alt={dish.name} />
              </div>
              <CardBody>
                <CardTitle tag="h5">{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <div className="card-footer">
                      <Button color="info"
                        outline
                      
                        onClick = {()=> addItem(dish)}
                      >
                      + Add To Cart
                      </Button>
                    
                    </div>
                    
                  </div>
                  <small className="text-body-secondary">${dish.price}</small>
                </div>
              </CardBody>
            </Card>
          </Col>
          ))}
        </Row>
      </Container>
      <Cart></Cart>




    </>
  );
};

export default Restaurant;











