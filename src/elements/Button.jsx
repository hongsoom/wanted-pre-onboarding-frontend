import styled from "styled-components";

export const Button = styled.button`
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  width: 100%;
  padding : 15px;
  font-size: ${({ theme }) => theme.fontSizes.m};

  transition: all 0.1s ease-in-out;
  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    background-color: #f2f2f2;
    cursor: default;
  }
`;

export const ButtonS = styled.button`
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  width: 20%;
  padding : 10px;
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

export const SendButton = styled.button`
  border: none;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
  width: 10%;
  padding : 5px;
  font-size: ${({ theme }) => theme.fontSizes.s};
`;