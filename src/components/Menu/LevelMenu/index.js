// This is an static version of the dynamic menu
// Routing is not in the optimal version, needs refactoring with react router
import { Container, Text } from 'react-pixi-fiber';

const LevelMenu = ({ ...props }) => {
  const style = {
    fontSize: 16,
  };

  return (
    <Container {...props}>
      <Text
        buttonMode
        interactive
        pointerup={() => {
          window.location.href = '/bunny-with-counter';
        }}
        position="100,100"
        style={style}
        text="Memorama"
      />
      <Text
        buttonMode
        interactive
        pointerup={() => {
          window.location.href = '/';
        }}
        position="250,100"
        style={style}
        text="Rompecabezas deslizante"
      />
      <Text
        buttonMode
        interactive
        pointerup={() => {
          window.location.href = '/';
        }}
        position="500,100"
        style={style}
        text="Sopa de letras"
      />
    </Container>
  );
};

export default LevelMenu;
