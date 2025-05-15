import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { useProductStore } from '../store/product.js'
const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
  name: "",
  price: "",
  image: "",
  })
  const {createProducts} = useProductStore()
  const Toast = useToast()
  const handleAddProduct = async () => {
const {success, message} = await createProducts(newProduct)
if(!success){
  Toast({
    title: "Error",
    description: message,
    status: "error",
    isClosable: true,
  })
}
else{
  Toast({
    title: "Success",
    description: message,
    status: "success",
    isClosable: true,
  })
}

  }

  return (
     <Container maxW="container.sm"  >
      <VStack spacing={8}>
        <Heading as="h1" textAlign="center" mb={8}>
          Create a new product
        </Heading>
        <Box w="full" bg={useColorModeValue("white", "gray.800")}
      p={6} rounded="lg" shadow="md">

      <VStack spacing={4} w={"full"}>
        <Input
        type='text'
        placeholder='Product name'
        name='name'
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
        />
     
      <Input
        type='number'
        placeholder='Price'
        name='price'
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
        />
    
 <Input 
        placeholder='Image URL'
        name='image'
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
        />
    <Button colorScheme='blue' onClick={handleAddProduct}  w='full'>
      Add Product
    </Button>

      </VStack>

        </Box>
      </VStack>
    </Container>
    )
   

}

export default CreatePage
