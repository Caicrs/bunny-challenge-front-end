import { colors } from "assets/styles/colors";
import { useEffect, useState } from "react";
import { AllUsers } from "services/ServiceUser";
import styled from "styled-components";
import { UserResponse } from "types/api-types/user";
import trash from "../../../assets/trash.svg";
import edit from "../../../assets/edit.svg";
import { useNavigate } from "react-router-dom";

export const TableList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserResponse[]>([
    {
      id: "",
      password: "",
      email: "",
      roles: [""],
      active: false,
      CreditCard: [{}],
    },
  ]);

  useEffect(() => {
    UsersRender();
  }, []);

  const UsersRender = async () => {
    const res = await AllUsers.UsersAll();
    setUsers(res?.data.data);
  };

  function copy(id: string) {  
    navigator.clipboard.writeText(id);
    alert("Id copiado");
  }

  const deleteUser = async (id:string) => {
    const res = await AllUsers.DeleteUser(id);
    window.location.reload()
  };

  return (
    <>
      {users?.map((item) => {
        return (
          <Container key={item.id}>
            <SubItems>{item.email}</SubItems>
            <SubItems>
              {item.roles.map((res) => (
                <div>Role : {res}</div>
              ))}
            </SubItems>
            <SubItems>Status : {item.active ? "Ativo" : "Desativado"}</SubItems>
            <SubItems>Credit Cards : {item.CreditCard.length}</SubItems>
            <CopyItem onClick={() => copy(item.id)}>Copy Id</CopyItem>
            
            <IconContainer>
              <Icon onClick={() => navigate(`/edit-user/${item.id}`)} src={edit}></Icon>
            </IconContainer>
            <IconContainer>
              <Icon onClick={() => deleteUser(item.id)} src={trash}></Icon>
            </IconContainer>
          </Container>
        );
      })}
    </>
  );
};

const mobile: string = "738px";

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

export const SubButton = styled.a`
  width: fit-content;
  text-align: right;
  color: ${colors.primaryBlack};
  fontWeight: 700;
  transition:0.3s;
  cursor:pointer;
  &:hover{
    color: ${colors.primaryWhite};
  }
`;

export const SubItems = styled.div`
  width: 100%;
  text-align: center;
`;

export const CopyItem = styled.div`
  width: 100%;
  text-align: center;
  opacity: 0.5;
  cursor:pointer;
  transition : 0.3s;
  &:hover{
    opacity: 1;
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
  height: fit-content;
  text-align: center;
  display: flex;
  align-items: center;
  // mobile
  @media (max-width: ${mobile}) {
    display: block;
    width: 100%;
  }
`;
