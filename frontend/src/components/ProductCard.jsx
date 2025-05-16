import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product.js'
import { useToast } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const ProductCard = ({ product }) => {
const [updatedProduct, setUpdateProduct] = useState(product)

  const textColor = useColorModeValue("gray.600", "gray.200")
  const bg= useColorModeValue("white", "gray.800")

  const toast = useToast()
  const{deleteProduct ,updateProduct} = useProductStore()
  const{isOpen, onOpen, onClose} = useDisclosure()


const handleDeleteProduct = async (pid) => {
const {success, message} = await deleteProduct(pid)
if(!success){
  toast({
    title: "Error",
    description: message,
    status: "error",
    isClosable: true,
  })
}
  else{
toast({
 title: "Success",
  description: message,
  status: "success",
  isClosable: true,
} )
  }
}
const handleUpdateProduct = async () => {
const {message, success}=await updateProduct(product._id, updatedProduct)
if(!success){
  toast({
    title: "Error",
    description: message,
    status: "error",
    isClosable: true,
  })
}
else{
  toast({
    title: "Success",
    description: message,
    status: "success",
    isClosable: true,
  })
}
  onClose()
}
  return (
   <Box
     shadow={"lg"}
     rounded={"lg"}
     overflow={"hidden"}
     transition={"all 0.3s"}
     _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
     bg={bg}
   >
    <Image src={product.image} alt={product.name} 
     h={48} w='full' objectFit='cover'/>
    <Box p={4}>
      <Heading as='h3' size='md' mb={2}>
        {product.name}
      </Heading>
      <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
        ${product.price}
      </Text>
      <HStack spacing={2} >
        <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
        <IconButton icon={<DeleteIcon />} onClick={() =>handleDeleteProduct(product._id)} colorScheme='red'  />
      </HStack>
    </Box>
    <Modal
    isOpen={isOpen} onClose={onClose}
    >
      <ModalOverlay />
<ModalContent>
  <ModalHeader>update product</ModalHeader>
  <ModalCloseButton />
  <ModalBody>
    <VStack spacing={4} w={"full"}>
    <Input
      placeholder='Product Name'
      name='name'
      value={updatedProduct.name}
      onChange={(e) => setUpdateProduct({ ...updatedProduct, name: e.target.value})}
  />

    <Input
      placeholder='Product price'
      name='price'
      value={updatedProduct.price}
      onChange={(e) => setUpdateProduct({ ...updatedProduct, price: e.target.value})}
     />   

    <Input
      placeholder='Product image'
      name='image'
      value={updatedProduct.image}
      onChange={(e) => setUpdateProduct({ ...updatedProduct, image: e.target.value})}
     />   
</VStack>

      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={() =>handleUpdateProduct(product._id, updateProduct)}>
          Update
        </Button>
        <Button variant='ghost' onClick={onClose}>
          Cancel
          </Button>
      </ModalFooter>
  </ModalContent>
    </Modal>
   </Box>
  )
}

export default ProductCard
