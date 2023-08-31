import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

const Exchanges = () => {
  const [exchanges, setExchange] = useState([]);
  const [filteredCoin, setFilteredCoin] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchange(data);
        setFilteredCoin(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request. Please{" "}
        <a href="/exchanges">
          <Button variant={"link"} colorScheme="blue">
            retry.
          </Button>
        </a>
      </Alert>
    );
  }

  const searchCoin = (e) => {
    const searchedValue = e.target.value;
    const filter = exchanges?.filter((coin) => coin.name.toLowerCase().includes(searchedValue.toLowerCase()))

    // console.log(searchedValue);
    setFilteredCoin(filter);
  }

  return (
    <Container maxW={"container.xl"} mt={"3"}>
      {loading ? (
        <Loader />
      ) : (
        <VStack>
          <HStack alignItems={"center"} justifyContent={"center"}>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="search"
                placeholder="Enter to search"
                borderColor={"gold"}
                focusBorderColor="gold"
                css={{ "&:hover": { borderColor: "orange" } }}
                onChange={searchCoin}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" mr={"1.5"} bgColor={"gold"}>
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack>
          <HStack
            mt={"4"}
            mb={"4"}
            flexWrap={"wrap"}
            justifyContent={"space-around"}
          >
            {filteredCoin.map((data) => {
              return (
                <ExchangeCard
                  key={data.id}
                  name={data.name}
                  img={data.image}
                  rank={data.trust_score_rank}
                  url={data.url}
                  country={data.country}
                  year={data.year_established}
                />
              );
            })}
          </HStack>
        </VStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url, country, year }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        m={"4"}
        width={"250px"}
        h={"200px"}
        style={{
          boxShadow: "gold 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
        borderRadius={"10px"}
        p={"4"}
        transition={"all 0.3s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={name} />
        <Heading size={"md"} noOfLines={"1"}>
          {rank}. {name}
        </Heading>
        <p>Country: {country}</p>
        <p>Year establised: {year}</p>
      </VStack>
    </a>
  );
};

export default Exchanges;
