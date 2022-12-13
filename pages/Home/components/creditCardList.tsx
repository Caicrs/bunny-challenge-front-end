import { colors } from "assets/styles/colors";
import { useEffect, useState } from "react";
import { AllCards } from "services/ServiceCreditCard";
import styled from "styled-components";
import { CreditCardResponse } from "types/api-types/creditCard";
import trash from "../../../assets/trash.svg";
import edit from "../../../assets/edit.svg";
import { Form } from "./form";

export const CreditCardList = () => {
  const [cards, setCards] = useState<CreditCardResponse[]>([
    {
      id: "",
      cardNumber: "",
      holder: "",
      active: false,
      expirationDate: "",
    },
  ]);

  useEffect(() => {
    CardsRender();
  }, []);

  const CardsRender = async () => {
    const res = await AllCards.CreditCardAll();
    setCards(res?.data.data);
  };

  const deleteCreditCard = async (id:string) => {
    const res = await AllCards.DeleteCreditCard(id);
    window.location.reload()
  };

  return (
    <>
      <Container style={{ background: "transparent" }}>
        <SubButton href="/create" style={{}}>Criar novo credit card</SubButton>
      </Container>
      {cards?.map((item) => {
        return (
          <Container key={item.id}>
            <SubItems>{item.holder}</SubItems>
            <SubItems>Status : {item.active ? "Ativo" : "Desativado"}</SubItems>
            <SubItems>{item.expirationDate}</SubItems>
            <IconContainer>
              <Icon onClick={() => deleteCreditCard(item.id)} src={trash}></Icon>
            </IconContainer>
          </Container>
        );
      })}
    </>
  );
};

const mobile: string = "738px";

export const SubButton = styled.a`
  width: fit-content;
  text-align: right;
  color: ${colors.primaryBlack};
  fontweight: 700;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: ${colors.primaryWhite};
  }
`;

export const Icon = styled.img`
  width: 24px;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.3s;
  colors: ${colors.primaryBlue};
  &:hover {
    opacity: 1;
  }
`;
export const IconContainer = styled.div`
  width: 25%;
  text-align: center;
  display: flex;
  align-items: center;
  // mobile
  @media (max-width: ${mobile}) {
    display: block;
    width: 100%;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  background: ${colors.primaryBlack};
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  // mobile
  @media (max-width: ${mobile}) {
    display: block;
  }
`;

export const SubItems = styled.div`
  width: 100%;
  text-align: center;
`;
