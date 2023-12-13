// import Head from "next/head";
import { Header } from "./common/header";
import { Footer } from "./common/footer";
import { Container, Grid, GridItem } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grid
        templateAreas={`"header"
          "container"
          "footer"`}
        gridTemplateRows={"60px 1fr 60px"}
        gridTemplateColumns={"1fr"}
        gap="1"
        fontWeight="bold"
        bg="gray.100"
      >
        <GridItem>
          <Header />
        </GridItem>
        <GridItem>
          <Container
            as="main"
            maxW="100%"
            minH={`calc(100vh - 120px)`}
            paddingY="40px"
          >
            {children}
          </Container>
        </GridItem>
        <GridItem>
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
}
