import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  &:hover {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
  }
`;

export const CustomTextField = styled(TextField)`
  input {
    font-size: 9px;
    padding: 2px 10px;
  }
`
