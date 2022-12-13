import { colors } from "assets/styles/colors";
import { useRef} from "react";
import styled from "styled-components";
import { RoutePath } from "types/routes";
import { AllCards } from "services/ServiceCreditCard";

export const CrudPage = () => {
  const userId = useRef("");
  const cardNumber = useRef("");
  const expirationDate = useRef("");
  const holder = useRef("");

  function Create(){
    const data = {
      userId: userId.current,
      active: true,
      cardNumber: cardNumber.current,
      expirationDate: expirationDate.current,
      holder: holder.current,
      creditToken: '',
    }
    const Card = async () => {
      const res = await AllCards.CreateCreditCard(data);
    };
    Card();
    window.location.reload()
  }

  ///crud/user
  return (
    <>
      <Tab>
        <ItemTab>Credit Cards</ItemTab>
      </Tab>
      <Tab style={{ background: "transparent" }}>
        <ItemTab style={{ textAlign: "left" }}>
          <Back href={RoutePath.HOME}>Voltar para listagem</Back>
        </ItemTab>
      </Tab>
      <Form>
        <Input onChange={(e) => userId.current = e.target.value}  placeholder="Insira um UserID" />
      </Form>
      <Form>
        {" "}
        <Input onChange={(e) => cardNumber.current = e.target.value} placeholder="Insira um CardNumber" />
      </Form>
      <Form>
        <Input onChange={(e) => expirationDate.current = e.target.value} placeholder="Insira a data de expiração ( ex : 10/32" />
      </Form>
      <Form>
        {" "}
        <Input onChange={(e) => holder.current = e.target.value} placeholder="Insira o nome do cliente no cartão" />
      </Form>
      <Form>
        <EnterBtn onClick={() => Create()}>Entrar</EnterBtn>
      </Form>
    </>
  );
};

export const Container = styled.div`
  width: 100%;
  background: red;
`;

export const EnterBtn = styled.div`
  color: ${colors.primaryWhite};
  background: ${colors.secondBlue};
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 1rem 0;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  margin: 2rem auto 0 auto;

  :hover {
    color: ${colors.secondBlue};
    background: transparent;
    outline: 1px solid ${colors.secondBlue};
  }
`;

export const Form = styled.div`
  width: 100vw;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

export const Button = styled.div`
  cursor: ;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  color: ${colors.primaryBlack};
  border: 0;
  border-radius: 8px;
  -webkit-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
`;

export const Back = styled.a`
  width: fit-content;
  margin-top: 1rem;z
  background: red;
`;

const Tab = styled.div`
  background: ${colors.primaryBlack};
  display: flex;
  width: 100%;
  height: fit-content;
`;

const ItemTab = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem 2rem;
  color: ${colors.primaryBlue};
  font-weight: 700;
`;
