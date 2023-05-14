import styled from "@emotion/styled";
import { Delete as MuiIconRemove } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  &:hover {
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    >[data-action="remove"] {
      display: flex;
    }
  }
`;

export const TodoDescription = styled.div`
  flex-grow: 10;
  margin-left:60px;
  margin-right:10px;
`;

export const ButtonContainer = styled(IconButton)`
  width: 20px;
  height: 10px;
  color: red;
  display: none;
`;

export const IconRemove = styled(MuiIconRemove)`
  width: 20px;
  height: 20px;
`;
