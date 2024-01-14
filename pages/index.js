import React, { useState } from "react";
import Cart from "../components/cart"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import RestaurantList from '../components/restaurantList';
import { Container, Row, Col, Button, InputGroup, InputGroupAddon, Input , Alert } from 'reactstrap';




function Home() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    console.log(`URL: ${API_URL}`)
    const [query, setQuery] = useState("");
    const link = new HttpLink({ uri: `${API_URL}/graphql`})
    const cache = new InMemoryCache()
    const client = new ApolloClient({link,cache});
 
  
    return (
        <ApolloProvider client={client}>

            <div className=" text-center p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
                <div className="text-center px-0">
                <h1 className ="display-4 fst-italic" style={{marginBottom:"50px"}}>Search You Favorite Japanesse Restaurant</h1>
                <InputGroup className="mx-auto" style={{ maxWidth: '300px'}}>
                    <Input
                        onChange={(e) =>
                        setQuery(e.target.value.toLocaleLowerCase())
                        }
                        value={query}
                        placeholder="Where do you want to eat today?"
                    />
                </InputGroup><br></br>

                </div>
            </div>

            <hr className="bg-body-secondary" style={{ height: '2px' , marginBottom:"50px"}} />

            <Alert color="primary" className="text-center">
                Restaurant List
            </Alert>

            <hr className="bg-body-secondary" style={{ height: '2px' , marginBottom:"50px"}} />

            <RestaurantList search={query} />

            <hr className="bg-body-secondary" style={{ height: '2px' , marginBottom:"50px"}} />

        </ApolloProvider>
    );
  }
  export default Home;
  