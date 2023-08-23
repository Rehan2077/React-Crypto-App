import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import { Alert, AlertIcon, Button, Container, HStack, Heading, Image, VStack } from "@chakra-ui/react";

const Exchanges = () => {
  const [exchanges, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchange(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if(error){
    return <Alert status='error'>
    <AlertIcon />
    There was an error processing your request. Please <a href="/exchanges"><Button variant={"link"} colorScheme="blue">retry.</Button></a>
  </Alert>
  }

  return (
    <Container maxW={"container.xl"} mt={"3"}>
      {loading ? (
        <Loader />
      ) : (
        <HStack mt={"4"} mb={"4"} flexWrap={"wrap"} justifyContent={"space-around"}>
          {exchanges.map((data) => {
            return (
              <ExchangeCard
                key={data.id}
                name={data.name}
                img={data.image}
                rank={data.trust_score_rank}
                url={data.url}
                country={data.country}
              />
            );
          })}
        </HStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url, country }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        m={"4"}
        width={"250px"}
        h={"200px"}
        shadow={"lg"}
        borderRadius={"10px"}
        p={"4"}
        transition={"all 0.3s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)"
          }
        }}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={name} />
        <Heading size={"md"} >
          {rank}. {name}
        </Heading>
        <p>Country: {country}</p>
      </VStack>
    </a>
  );
};

export default Exchanges;
