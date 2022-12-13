import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { RoutePath } from "types/routes";
import styled from "styled-components";
import { colors } from "assets/styles/colors";
import { useState } from "react";
import { TableList } from "./components/tableList";
import { CreditCardList } from "./components/creditCardList";
import { LocalStorageHelper } from "helpers/LocalStorageHelper";

const Home = () => {
  const [thisTab, setThisTab] = useState(0);
  const navigate = useNavigate();

  function logout(){
    LocalStorageHelper.clear()
    window.location.reload()
  }

  return (
    <motion.div
      animate={{ opacity: [0, 1], y: [-100, 0] }}
      transition={{ delay: 1.5 }}
    >
      <Container>
        <Tab>
          <ItemTab
            onClick={() => setThisTab(0)}
            style={thisTab == 0 ? { background: "white", opacity: 1 } : {}}
          >
            Users
          </ItemTab>
          <ItemTab
            onClick={() => setThisTab(1)}
            style={thisTab == 1 ? { background: "white", opacity: 1 } : {}}
          >
            Credit Cards
          </ItemTab>
          <ItemTab
            onClick={() => logout()}
            style={{ background: "transparent", opacity: 1 } }
          >
            Sair
          </ItemTab>
        </Tab>
        <ContentContainer>
          {thisTab == 0 ? <TableList /> : <CreditCardList/>}
        </ContentContainer>
      </Container>
    </motion.div>
  );
};

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: top;
`;

const Tab = styled.div`
  background: ${colors.primaryBlack};
  display: flex;
  width: 100%;
  height: fit-content;
`;

const ItemTab = styled.div`
  width: 100%;
  cursor: pointer;
  opacity: 0.25;
  padding: 1rem 0;
  color: ${colors.primaryBlue};
  font-weight: 700;
  text-align: center;
  -webkit-box-shadow: 10px 10px 40px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 40px -8px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 40px -8px rgba(0, 0, 0, 0.75);
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;
