import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
        <Box transform={"scale(4)"}>
          <Spinner color='gold' />
        </Box>
    </VStack>
  )
}

export default Loader