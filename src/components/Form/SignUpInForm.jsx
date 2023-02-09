import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";
import instance from "../../api/api";

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

                if (localStorage.getItem("token")) {
                    window.location.assign('/todo');
                }
            })
            .catch((err) => {
                setPasswordError(err.response.data.message);
            });
    }

    return (
        <Wrap>
            {match ? <h1> 로그인</h1> : <h1>회원가입</h1>}
            <Title>이메일</Title>
            <Input
                name="email"
                type="email"
                vale={email}
                data-testid="email-input"
                onChange={onEmail}
                placeholder="wanted@wanted.co.kr"
                autocapitalize="off"
                autoComplete="off"
                required
            />
            <Error>{emailError}</Error>
            <Title>비밀번호</Title>
            <Input
                name="password"
                type="password"
                vale={password}
                data-testid="password-input"
                onChange={onPassword}
                placeholder="8자 이상 입력해주세요."
                minlength="8"
                autocapitalize="off"
                autoComplete="off"
                required
            />
            <Error>{passwordError}</Error>
            <ButtonWrap>
                {match ?
                    <Button
                        data-testid="signin-button"
                        disabled={isValidLogin}
                        onClick={SignIn}>
                        로그인
                    </Button>
                    :
                    <Button
                        data-testid="signup-button"
                        disabled={isValidLogin}
                        onClick={SignUp}>
                        회원가입
                    </Button>}
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

const Title = styled.div`
    margin-bottom: 8px;
    font-family: NotoSansM;
    font-size: ${({ theme }) => theme.fontSizes.m};
    color: ${({ theme }) => theme.colors.gray};
`;

const Error = styled.div`
    height: 1em;
    margin-top: 8px;
    margin-bottom: 24px;
    font-size: ${({ theme }) => theme.fontSizes.s};
    color: ${({ theme }) => theme.colors.orange};
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