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
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {} from "react-icons/";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoin, setFilteredCoin] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  // const [searchInput,setSearchInput] = useState('')

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const searchCoin = (e) => {
    const searchedValue = e.target.value;
    const filter = coins?.filter((coin) => coin.name.toLowerCase().includes(searchedValue.toLowerCase()))

    console.log(searchedValue);
    setFilteredCoin(filter);
  }

  const btns = new Array(132).fill(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setFilteredCoin(data);
        setCoins(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

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
  const handleSearch = () => {
    <Link to={`/coins/`} />
  }
  // console.log(searchInput);

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
            <HStack alignItems={"center"} justifyContent={"center"}>
              {/* <Input
                w={["300px", "250px"]}
                onChange={(e)=>setSearchInput(e.target.value)}
                type="search"
                placeholder="Enter to search"
                borderColor={"gold"}
                focusBorderColor="gold"
                css={{ "&:hover": { borderColor: "orange" } }}
              /> */}
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type='search'
                  placeholder="Enter to search"
                  borderColor={"gold"}
                  focusBorderColor="gold"
                  css={{ "&:hover": { borderColor: "orange" } }}
                  // onChange={(e)=>setSearchInput(e.target.value)}
                  onChange={searchCoin}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" mr={"1.5"} onClick={handleSearch} bgColor={"gold"} >
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
            </HStack>
          </Stack>

          <HStack
            mt={"4"}
            mb={"4"}
            flexWrap={"wrap"}
            justifyContent={"space-around"}
          >
            {filteredCoin.map((data, index) => {
              return (
                <CoinCard
                  key={data.id}
                  name={data.name}
                  img={data.image}
                  rank={index + 1}
                  id={data.id}
                  currentPrice={data.current_price}
                  symbol={data.symbol}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack p={"8"} w={"full"} overflowX={"auto"}>
            {btns.map((item, index) => {
              return (
                <Button key={index} onClick={() => changePage(index + 1)}>
                  {" "}
                  {index + 1}
                </Button>
              );
            })}
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

export default Coins;
