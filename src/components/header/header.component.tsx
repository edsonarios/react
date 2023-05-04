import { Box } from "@mui/system";

type Props = {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <h3 style={{ margin: 0 }} >{title}</h3>
    </Box>
  );
};

export default Header;
