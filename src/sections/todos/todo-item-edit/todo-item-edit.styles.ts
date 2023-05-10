import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  &:hover {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
  }
`;

export const CustomTextField = styled(TextField)`
  width: 700px;
  input {
    font-size: 24px;
    padding: 2px 10px;
    margin-left:50px;
  }
`
