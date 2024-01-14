import {gql,useQuery} from '@apollo/client';
import Dishes from "./dishes"
import {useContext, useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
Alert} from "reactstrap";





function RestaurantList(props){

  const[restaurantID, setRestaurantID] = useState(0)

  const {cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
  
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)


let searchQuery = data.restaurants.filter((res) =>{
    return res.name.toLowerCase().includes(props.search)
  })

let restId;

  if (searchQuery.length > 0) {
    restId = searchQuery[0].id;
  } else {
    // Manejar el caso cuando no se encuentran restaurantes
    console.log("No restaurant found");
    return <h1 className="text-center">No Restaurants Found :c </h1>;
  }
  
 
// definet renderer for Dishes
  const renderDishes = (restaurantID) => {
    return (<Dishes restId={restaurantID}> </Dishes>)
  };

if(searchQuery.length > 0){
  const restList = searchQuery.map((res) => (


    <Container style={{marginBottom:"20px"}}>
      <div className="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden" style={{backgroundColor: "#FFF9F8" , marginBottom:"10px"}}>
            <div className="my-3 p-3" >
              <h2 className="display-5">{res.name}</h2>
              <p className="lead">{res.description}</p>
            </div>
          <div className="bg-body shadow-sm mx-auto" style={{marginBottom:"20px",backgroundColor: "red" ,width: "80%", height: "300px" , borderRadius: "21px 21px 0 0"}}>
            <CardImg
              top={true}
              style={{ height: 300 ,width:"500px"} }
              src={
              `http://localhost:1337`+ res.image.url
              }
            />
          </div>
          <Link href={`/${res.name}`}>
            <a>
              <Button color="danger" outline >
                Check My Dishes :D
              </Button>
            </a>
          </Link>
      </div>
    </Container  >



  ))

  return(

    <Container>
    <Row xs='3'>
      {restList}
    </Row>



    </Container>
 
  )
} else {
  return <h1> No Restaurants Found</h1>
}
}
   export default RestaurantList