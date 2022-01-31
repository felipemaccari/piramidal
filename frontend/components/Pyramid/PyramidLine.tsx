import { Flex, Text } from "@chakra-ui/react";

const Pyramid = ({ players }: any) => {
  return players.map((player: any) => {
    return (
      <Flex
        key={player.name}
        width="100px"
        border="1px solid #ccc"
        justify="center"
      >
        <Text>{player.name}</Text>
      </Flex>
    );
  });
};

export default Pyramid;
