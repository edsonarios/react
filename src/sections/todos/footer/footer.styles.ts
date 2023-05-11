import styled from "@emotion/styled";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Wrapper = styled.button`
  margin-top: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: transparent;
  margin-left:14px;
  border: none;
`;

export const AddIcon = styled(AddCircleOutlineIcon)`
  color: #3d82eb;
  widht: 24px;
  height: 24px;
`

export const AddText = styled.span`
  color: #3d82eb;
  font-size: 24px;
  padding: 0 12px;
  margin-left:10px;
`

export const AddIconDisable = styled(AddCircleOutlineIcon)`
  color: #9b9b9b;
  widht: 24px;
  height: 24px;
`

export const AddTextDisable = styled.span`
  color: #9b9b9b;
  font-size: 24px;
  padding: 0 12px;
  margin-left:10px;
`
