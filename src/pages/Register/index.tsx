import logo from "../../assets/logo.svg";
import eye from "../../assets/eye.svg";
import eyeClosed from "../../assets/eye-closed.svg";
import { motion } from "framer-motion";
import styled from "styled-components";
import { colors } from "./../../assets/styles/colors";
import Link, { useState, useRef } from "react";
import Image from "react";
import { useNavigate } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { AuthService } from "../../services/AuthServices";
import { LoginResponse } from "../../types/api-types/login";
import { ErrorResponse } from "../../types/api-types/error";
import { LocalStorageHelper } from "../../helpers/LocalStorageHelper";
import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import { RoutePath } from "../../types/routes";
import { User } from "../../types/api-types/user";
import { AllUsers } from "services/ServiceUser";

const mobile: string = "600px";
const desktop: string = "1024px";
const tablet: string = "825px";

const queryClient = new QueryClient();

export default function Register() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRegister />
    </QueryClientProvider>
  );
}

const MainRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  const mutation = useMutation(AuthService.login, {
    onSuccess: (data: LoginResponse & ErrorResponse) => {
      if (data.statusCode) {
        console.log(data);
        setErrorMessage(data.message);
        return;
      }
      if (data.accessToken && data.refreshToken) {
        LocalStorageHelper.set<string>(
          LocalStorageKeys.TOKEN,
          data.accessToken
        );
        navigate(RoutePath.HOME);
      }
      setErrorMessage("Tente novamente!");
    },

    onError: () => {
      setErrorMessage("Ocorreu um erro durante a requisição");
    },
  });

  function Submit() {
    if (
      password.current.match(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ) &&
      password.current == confirmPassword.current
    ) {
      const UsersRender = async () => {
        const res = await AllUsers.CreateUser(data);
      };
      const data = {
        email: email.current,
        password: password.current,
        confirmPassword: password.current,
        roles: "",
      };
      UsersRender();
      console.log(data);
      email.current = "";
      password.current = "";
      setTimeout(() => mutation.mutate(data), 1000 * 5)
      setErrorMessage("");
    } else {
      setToast(true)
      setTimeout(() => setToast(false), 1000 * 3)
    }
  }

  const transition = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  // Eye icon ( hidden and open ) logic
  const [eyeLogic, setEyeLogic] = useState(true);
  const eyeChange = () => {
    if (eyeLogic) {
      setEyeLogic(false);
    } else {
      setEyeLogic(true);
    }
  };

  return (
    <Container>
      {toast ? <Toast /> : ""}
      <motion.div variants={transition} initial="hidden" animate="show">
        <Subcontainer>
          <TextImg>
            <TitleContainer>
              <Text>Register</Text>
            </TitleContainer>
            <Description>
              Já possui uma conta ?{" "}
              <CreateAccount href="/login">Entrar</CreateAccount>
            </Description>
          </TextImg>

          <InputGrid>
            <InputContainer>
              <Input
                id={"id1"}
                onChange={({ target }) => (email.current = target.value)}
                placeholder="Insira seu email"
                type="text"
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              <Input
                id={"id2"}
                onChange={({ target }) => (password.current = target.value)}
                placeholder="Insira sua senha"
                type={eyeLogic ? "password" : "text"}
                autoComplete="off"
              />
              <EyeIcon
                onClick={eyeChange}
                src={eyeLogic ? eyeClosed : eye}
              ></EyeIcon>
            </InputContainer>
            <InputContainer>
              <Input
                id={"id2"}
                onChange={({ target }) =>
                  (confirmPassword.current = target.value)
                }
                placeholder="Insira novamente sua senha"
                type={eyeLogic ? "password" : "text"}
                autoComplete="off"
              />
              <EyeIcon
                onClick={eyeChange}
                src={eyeLogic ? eyeClosed : eye}
              ></EyeIcon>
            </InputContainer>
            <ForgetPassword>Esqueceu a senha ?</ForgetPassword>
            <EnterBtn onClick={() => Submit()}>Entrar</EnterBtn>
          </InputGrid>
        </Subcontainer>
      </motion.div>
    </Container>
  );
};

const Toast = () => {
  return (
    <BoxToast>
      As senhas não são iguais ou ela precisa ser mais forte...
    </BoxToast>
  );
};

const BoxToast = styled.div`
  padding: 1rem 2rem;
  position: absolute;
  font-size: 16px;
  border-radius: 8px;
  top : 1rem ;
  background: ${colors.primaryBlack};
  color: ${colors.primaryBlue};
`;

const CreateAccount = styled.a`
  padding-left: 0.5rem;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
    font-weight: 700;
  }
`;

const EyeIcon = styled.img`
  width: 26px;
  height: 26px;
  padding-right: 1rem;
`;

const InputGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: ${colors.primaryWhite};
  -webkit-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 17px 0px rgba(0, 0, 0, 0.24);
`;

const Input = styled.input`
display: flex;
font-size: 12px;
font-weight:700;
padding: 0.75rem 1.3rem ;
text-shadow: none;
background: transparent;
border: 0;
flex: 1 1 auto;
transition:0.3s;
color:${colors.primaryBlack};
line-height:25px;

&:focus {
  outline:none;
  color: ${colors.primaryBlue};
}

&:not(:focus) {
  color: ${colors.primaryBlue};
}
}
::placeholder {
    font-weight:400;
    opacity:0.5;
    color:${colors.primaryBlack};
}
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

export const Container = styled.div`
  height: fit-content;
  width: 100vw;
  background: ${colors.primaryBlue};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    display: block;
    padding: 4rem 0 0 0;
  }
`;

const ForgetPassword = styled.div`
  color: ${colors.primaryWhite};
  margin-left: auto;
  margin-right: 0;
  width: fit-content;
  text-align: right;
  font-size: 0.7rem;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const Icon = styled.img`
  width: fit-content;
  height: 8px;
  background: transparent;
  padding-right: 0.5rem;
`;

const Icondiv = styled.div`
  line-height: 0;
`;

const Text = styled.div`
  font-size: 22px;
  color: ${colors.primaryWhite};
  font-weight: 700;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    font-size: 28px;
  }
`;

const Strong = styled.div`
  color: #136a9a;
  font-weight: 700;
  padding-left: 0.5rem;
`;

const Description = styled.div`
  color: ${colors.primaryWhite};
  font-size: 12px;
  font-weight: 400;
  padding: 1.25rem 0 0;
  width: fit-content;
  display: flex;
  margin: 0 auto;
  text-align: center;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    padding: 1.25rem 0 0;
    font-size: 14px;
  }
`;

export const Input2 = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 1rem;
  font-size: 0.9rem;
  margin: 0 auto;
  border-radius: 4px;
  border: none;
  background-color: #f0efff;
  color: black;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.1);
  text-shadow: 0px 0px 12px rgba(255, 255, 255, 0.1);
  ::placeholder {
    color: color: ${colors.primaryBlue};
    font-weight: 300;
    opacity: 0.5;
    font-size: 0.9rem;
    @media (max-width: ${tablet}) and (min-width: 0) {
      font-size: 1rem;
    }
  }
  &:focus {
    outline: none;
  }
`;

export const Subcontainer = styled.div`
  width: 300px;
  border-radius: 8px;
  text-align: center;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 35px;
  background: ${colors.primaryBlue};
  padding: 2rem 2rem 0 2rem;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    padding: 0 2rem;
    width: 60%;
    margin: 0 auto;
    box-sizing: border-box;
    display: block;
    background: transparent;
  }
  // mobile
  @media screen and (min-width: 0) and (max-width: ${mobile}) {
    width: 100%;
  }
`;

export const SubTextContainer = styled.div``;

export const TextImg = styled.div`
  width: 100%;
  margin: 15% auto;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    padding: 10% 0 25% 0;
  }
`;

export const TitleContainer = styled.div`
  width: fit-content;
  display: flex;
  margin: 0 auto;
`;

export const SubDescription = styled.div`
background:green;
color: ${colors.primaryWhite}
font-weight:700;
position:relative;
`;

export const SocialContainer = styled.div`
  width: 100%;
  color: ${colors.primaryWhite};
  font-size: smaller;
  text-align: center;
  // tablet
  @media screen and (min-width: 0) and (max-width: ${tablet}) {
    padding: 25% 0 0;
  }
`;

export const SocialSubContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 1.5rem 2rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
`;

export const SocialIcons = styled.img`
  background: transparent;
  margin: 0 auto;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    opacity: 1;
  }
`;

export const Logo = styled.img`
  width: fit-content;
  height: 18px;
  margin: 0 auto;
  display: block;
  background: transparent;
`;

export const LinkBtn = styled.img`
  font-family: "Sora", sans-serif;
  color: red;
`;

// IMAGE LOGO _____________________________________________
export const LogoContainer = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  line-height: 0;
`;
