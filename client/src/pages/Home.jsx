import React from "react";
import {
  Container,
  Navbar,
  BlankDocument,
  Model,
  Documents,
  AddDocument,
} from "../components/components";
import useModelStore from "../hooks/useModelStore";

const Home = () => {
  const { isModel } = useModelStore();

  return (
    <>
      {isModel && (
        <Model>
          <AddDocument />
        </Model>
      )}

      <div className="bg-gray-100">
        <Navbar />

        <section>
          <Container>
            <div className="py-2">
              <BlankDocument />
            </div>
          </Container>
        </section>
        <section className="bg-white">
          <Container>
            <h1 className="py-3">Your Documents</h1>
            <Documents />
          </Container>
        </section>
      </div>
    </>
  );
};

export default Home;
