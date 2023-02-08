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

export const InputTitle = styled.div`
  font-family: NotoSansM;
  font-size: ${({ theme }) => theme.fontSizes.m};
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 8px;
`;

export const HelpText = styled.div`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.s};
  height: 1em;
  margin-top: 8px;
  margin-bottom: 24px;
`;
