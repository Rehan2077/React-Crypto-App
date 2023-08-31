import {
  Alert,
  AlertIcon,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../index";
import Loader from "./Loader";

const SearchCoinDetails = () => {
    const {id} = useParams();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");


    
    const currencySymbol =
      currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  
    useEffect(() => {
      const fetchCoins = async () => {
        try {
          const { data } = await axios.get(
            `${server}/coins/${id}`
          );
          setCoins(data);
          setLoading(false);
          console.log(data);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchCoins();
    }, [currency]);
  
    if (error) {
      return (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request. Please{" "}
          <a href="/coins">
            <Button variant={"link"} colorScheme="blue">
              retry.
            </Button>
          </a>
        </Alert>
      );
    }
  
    return (
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Stack
              direction={["column", "row"]}
              p={"8"}
              gap={["10px", "50px"]}
              justifyContent={"space-between"}
            >
              <HStack>
                <RadioGroup
                  value={currency}
                  colorScheme="orange"
                  onChange={setCurrency}
                >
                  <HStack m={"3"} spacing={"8"}>
                    <Radio value="inr">INR</Radio>
                    <Radio value="usd">USD</Radio>
                    <Radio value="eur">EUR</Radio>
                  </HStack>
                </RadioGroup>
              </HStack>
            </Stack>
  
            <HStack
              mt={"4"}
              mb={"10"}
              flexWrap={"wrap"}
              justifyContent={"center"}
            >
            <CoinCard
                  key={coins.id}
                  name={coins.name}
                  img={coins.image.small}
                  rank={coins.coingecko_rank}
                  id={coins.id}
                  currentPrice={coins.market_data.current_price[currency]}
                  symbol={coins.symbol}
                  currencySymbol={currencySymbol}
                  />
            </HStack>
          </>
        )}
      </Container>
    );
  };
  
  const CoinCard = ({ name, img, id, currentPrice, symbol, currencySymbol }) => {
    return (
      <Link to={`/coins/${id}`}>
        <VStack
          m={"4"}
          width={"250px"}
          h={"200px"}
          // shadow={"dark-lg"}
          // boxShadow={"pink"}
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
          <Heading size={"md"}>{symbol}</Heading>
          <Heading size={"sm"}>{name}</Heading>
          <p>
            Current Price: {currencySymbol}
            {currentPrice}
          </p>
        </VStack>
      </Link>
    );
  };
  
export default SearchCoinDetails;