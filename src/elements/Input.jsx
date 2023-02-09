import styled from "styled-components";

export const Input = styled.input`
  width: 93%;
  border: 1px solid lightGray;
  padding: 15px;
  font-size: ${({ theme }) => theme.fontSizes.m};
  font-family: NotoSansM;
  &:focus {
    outline: 1px solid orange;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const InputS = styled.input`
  width : 80%;
  border: 1px solid lightGray;
  
  &:focus {
    outline: 1px solid orange;
  }
`;

export const Label = styled.label`
    display: flex;
    margin-right: 10px;

    &:before {
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    background-color: white;
    border: 2px solid gainsboro;
    border-radius: 0.35rem;
    }

    &:after {
      opacity: ${({ checked }) => checked ? '1' : '0'};
        content: "";
        position: absolute;
        height: 1.5rem;
        width: 1.5rem;
        border: 2px solid transparent;
        border-radius: 0.35rem;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: orange;
    }
`;

export const CheckInput = styled.input`
    display: none;
    padding: 5px;
    margin : 5px;
`;