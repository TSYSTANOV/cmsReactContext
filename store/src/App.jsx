import "./App.css";
import { AddGoodButton } from "./components/AddGoodButton/AddGoodButton";
import { Container } from "./components/Container/Container";
import ListOfGoods from "./components/ListOfGoods/ListOfGoods";
import { Modal } from "./components/Modal/Modal";

function App() {
  return (
    <>
      <Container>
        <h1 class="mb-3">Приложение для управления товарами</h1>
        <AddGoodButton />
        <ListOfGoods />
        <Modal />
      </Container>
    </>
  );
}

export default App;
