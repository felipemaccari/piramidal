import { Flex, Text, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <nav>
      <Flex
        height="80px"
        width="100%"
        border="1px solid #ccc"
        justify="space-between"
        align="center"
        px="3%"
      >
        <Text>piramidal</Text>
        <Button variant="link">login</Button>
      </Flex>
    </nav>
  );
};

export default Navbar;
