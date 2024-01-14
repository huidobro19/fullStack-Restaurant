import React, { useState } from "react";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import Restaurant from '../components/restaurant';
import Cart from "../components/cart"

function Umaipage() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://143.110.144.158:1337";

    console.log(`URL: ${API_URL}`)

    const [query, setQuery] = useState("");

    const link = new HttpLink({ uri: `${API_URL}/graphql` })
    const cache = new InMemoryCache()
    const client = new ApolloClient({ link, cache });

    
    const RestaurantData = () => {
      const GET_RESTAURANT = gql`
          query GetRestaurantByName($name: ID!) {
              restaurant(id: $name) {
                  id
                  name
                  description
                  image {
                      url
                  }
              }
          }
      `;

      const GET_DISHES = gql`
          query GetDishesById($id: ID!) {
              restaurant(id: $id) {
                  id
                  name
                  dishes {
                      id
                      name
                      description
                      price
                      image {
                          url
                      }
                  }
              }
          }
      `;

      
    const { loading: restaurantLoading, error: restaurantError, data: restaurantData } = useQuery(GET_RESTAURANT, {
        variables: { name: "1" },
    });
    
    console.log("Query result (Restaurant):", restaurantData);
    
    // Check if restaurant data is available
    const restaurantId = restaurantData?.restaurant?.id;
    

    const { loading: dishesLoading, error: dishesError, data: dishesData } = useQuery(GET_DISHES, {
        variables: { id: restaurantId },
        skip: !restaurantId, // Skip this query if restaurantId is not available
    });
    
    console.log("Query result (Dishes):", dishesData);
    
    if (restaurantLoading || dishesLoading) return <p>Loading...</p>;
    if (restaurantError || dishesError) return <p>Error: {restaurantError?.message || dishesError?.message}</p>;
    
    // Ensure that restaurant data is available before rendering
    if (!restaurantData || !restaurantData.restaurant) return <p>Restaurant not found</p>;
    
    var restaurant = restaurantData.restaurant;
    var dishes = dishesData?.restaurant?.dishes;
    
    return <Restaurant restaurant={restaurant} dishes={dishes} />
    };

    return (
        <ApolloProvider client={client}>
            <RestaurantData />
            
        </ApolloProvider>
    );
}

export default Umaipage;







