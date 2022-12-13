import { colors } from "assets/styles/colors";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { RoutePath } from "types/routes";
import { AllUsers } from "services/ServiceUser";

export const EditUserPage = () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf("/") + 1);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    UsersRender();
    console.log(email);
  }, []);

  const UsersRender = async () => {
    const res = await AllUsers.UserById(id);
    setEmail(res?.data.data.email);
  };

  const Edit = async () => {
    const data = {
      email : email
    }
    const res = await AllUsers.EditUser(id, data);
    setTimeout(() => window.location.reload(),1000 * 3)
   
  };

  ///crud/user
  return (
    <>
      <Tab>
        <ItemTab>User</ItemTab>
      </Tab>
      <Tab style={{ background: "transparent" }}>
        <ItemTab style={{ textAlign: "left" }}>
          <Back href={RoutePath.HOME}>Voltar para listagem</Back>
        </ItemTab>
      </Tab>
      <Form>
        <Input onChange={(e) => setEmail(e.target.value)} placeholder={email} />
      </Form>
      <Form>
        <EnterBtn onClick={() => Edit()}>Entrar</EnterBtn>
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
