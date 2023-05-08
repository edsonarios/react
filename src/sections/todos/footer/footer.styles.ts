import styled from "@emotion/styled";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Wrapper = styled.button`
  margin-top: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
`;

export const AddIcon = styled(AddCircleOutlineIcon)`
  color: #3D82EB;
  widht: 12px;
  height: 12px;
`

export const AddText = styled.span`
  color: #3D82EB;
  font-size: 10px;
  padding: 0 12px;
`
