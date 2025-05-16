import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useProductStore } from '../store/product.js'
import ProductCard from '../components/ProductCard.jsx'

const HomePage = () => {
  const { products ,fetchProducts} = useProductStore()

  useEffect(() => {
    fetchProducts()}, [fetchProducts])

  return (
    <Container maxW="container.xl" py={12} >
  <VStack spacing={8}>
    <Text 
    fontSize={"30"}
    fontWeight={"bold"}
    bgGradient="linear(to-r, cyan.400, blue.500)"
    bgClip="text"
    textAlign={"center"}>
      Current Products
    </Text>
    <SimpleGrid 
    columns={{
      base: 1,
      sm: 2,
      md: 3      
    }}
    spacing={5}
    w={"full"}
    >
{products.map((product) => (
<ProductCard key={product._id} product={product} />
))}
    

    </SimpleGrid>

{products.length === 0 && (
    <Text fontSize={'xl'} textAlign={"center"} fontWeight={'bold'} color={"gray.600"}>
      No Products found 😢
      <Text as='span' color={"blue.500"} _hover={{ textDecoration: "underline" }}>
        <Link to={'/create'}>Create a Product</Link>
      </Text>
    </Text>
)}
  </VStack>
   </Container>
  )
}

export default HomePage
