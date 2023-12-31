import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "../index";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrecy] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  // https://api.coingecko.com/api/v3/coin/bitcoin
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays(key);
        setLoading(true);
        break;
      case "7d":
        setDays(key);
        setLoading(true);
        break;
      case "14d":
        setDays(key);
        setLoading(true);
        break;
      case "30d":
        setDays(key);
        setLoading(true);
        break;
      case "60d":
        setDays(key);
        setLoading(true);
        break;
      case "200d":
        setDays(key);
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays(key);
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
        console.log(data);
        console.log(chartData.prices);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, id, days]);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request. Please
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
          <Box width={"full"} borderWidth={"1"}>
            <Chart arr={chartArray} days={days} currency={currencySymbol} />
          </Box>

          <HStack p={"4"} wrap={"wrap"}>
            {btns.map((item) => {
              return (
                <Button size={["sm","md"]} onClick={() => switchChartStats(item)}>{item}</Button>
              );
            })}
          </HStack>

          <RadioGroup value={currency} colorScheme='orange' onChange={setCurrecy} p={"8"}>
            <HStack m={"3"} spacing={"8"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"10"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last updated on {Date(coin.market_data.last_updated).split("G")}
            </Text>
            <Image src={coin.image.small} />
            <Stat>
              <StatLabel fontWeight={600} fontSize={"xl"}>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={"2xl"}
              color={"white"}
              bgColor={"blackAlpha.800"}
            >{`Rank: #${coin.market_cap_rank}`}</Badge>
            <CustomBar
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              change={coin.market_data.price_change_percentage_24h}
            />
            <Box p={"2"} w={"full"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low, change }) => {
  return (
    <VStack w={"full"}>
      <Progress value={change>0?(change*100):(change*(-100))} colorScheme={change>0?'green':'red'} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme="red" />
        <Text>24H Range</Text>
        {
          console.log(change)
        }
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
