import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { FixedSizeBlackBtn } from "../elements/Buttons";
import { HelpText, Input, InputTitle } from "../elements/Inputs";
import instance from "../api/api";

const SignUpInForm = () => {

    const match = useMatch("/signin");

    const navigate = useNavigate();

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const onChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const { email, password } = state;
    const validEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const isValidLogin = !(validEmail.test(email) && password.length > 7);

    const onEmail = (e) => {
        onChangeState(e);

        if (validEmail.test(email)) {
            setEmailError("");
        } else {
            setEmailError("이메일 형식이 올바르지 않습니다.")
        }
    }

    const onPassword = (e) => {
        onChangeState(e);

        if (password.length < 7) {
            setPasswordError("8자 이상 입력해주세요.");
        } else {
            setPasswordError("")
        }
    }

    const SignUp = async () => {
        await instance
            .post('auth/signup', {
                email: email,
                password: password,
            })
            .then((res) => {
                navigate('/signin');
            })
            .catch((err) => {
                setPasswordError(err.response.data.message);
            });
    }

    const SignIn = async () => {
        await instance
            .post('auth/signin', {
                email: email,
                password: password,
            })
            .then((res) => {
                const token = res.data.access_token;
                localStorage.setItem("token", token);
                navigate('/todo');
            })
            .catch((err) => {
                setPasswordError(err.response.data.message);
            });
    }

    return (
        <Wrap>
            {match ? < h1> 로그인</h1> : <h1>회원가입</h1>}
            <InputTitle>이메일</InputTitle>
            <Input
                name="email"
                type="email"
                data-testid="email-input"
                onChange={onEmail}
                placeholder="wanted@wanted.co.kr"
                autocapitalize="off"
                autoComplete="off"
                required
            />
            <HelpText>{emailError}</HelpText>
            <InputTitle>비밀번호</InputTitle>
            <Input
                name="password"
                type="password"
                data-testid="password-input"
                onChange={onPassword}
                placeholder="8자 이상 입력해주세요."
                autocapitalize="off"
                autoComplete="off"
                required
            />
            <HelpText>{passwordError}</HelpText>
            <ButtonWrap>
                {match ?
                    <FixedSizeBlackBtn
                        data-testid="signin-button"
                        disabled={isValidLogin}
                        onClick={SignIn}>
                        로그인
                    </FixedSizeBlackBtn>
                    :
                    <FixedSizeBlackBtn
                        data-testid="signup-button"
                        disabled={isValidLogin}
                        onClick={SignUp}>
                        회원가입
                    </FixedSizeBlackBtn>}
                <LogWrap>
                    {match ?
                        <>
                            <Info>아이디가 없으신가요?</Info>
                            <LoginBtn
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                회원가입
                            </LoginBtn>
                        </>
                        :
                        <>
                            <Info>아이디가 있으신가요?</Info>
                            <LoginBtn
                                onClick={() => {
                                    navigate("/signin");
                                }}
                            >
                                로그인
                            </LoginBtn>
                        </>}
                </LogWrap>
            </ButtonWrap>
        </Wrap >
    );
};

const Wrap = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 30px;
    margin: 50px;
    background: #ffffff;
    border: 1px solid #dcdcdc;

    h1 {
        font-family: NotoSansB;
        text-align: center;
        font-size: ${({ theme }) => theme.fontSizes.xl};
        font-weight: 700;
        margin: 50px 0;
    }
`;

const ButtonWrap = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LogWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const Info = styled.p`
    font-family: NotoSansL;
    margin-bottom: 10px;
    font-size: 13px;
    color: #757575;
    align-self: flex-start;
`;

const LoginBtn = styled.span`
    font-family: NotoSansL;
    font-size: 14px;
    cursor: pointer;
    margin-left: 6px;
    font-weight: bold;
    text-decoration: underline;
`;

export default SignUpInForm;