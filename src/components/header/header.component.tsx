import { Box } from "@mui/system";

type Props = {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    // <Box display="flex" justifyContent="space-between" alignItems="center">
    //   <h3 style={{ margin: 0 }} >{title}</h3>
    // </Box>
    <header>
      <h1>{title}
        <img
          style={{ width: '120px', height: 'auto' }}
          src='https://repository-images.githubusercontent.com/318576591/a7182780-3625-11eb-925d-adc07c4e5e7c'></img>
      </h1>

      {/* <CreateTodo saveTodo={saveTodo} /> */}
    </header>
  );
};

export default Header;
