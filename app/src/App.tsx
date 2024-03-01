import Footer from "@/presentation/components/footer/Footer";
import Header from "@/presentation/components/header/Header";
import Task from "@/presentation/pages/task/Task";
import { Container } from "./App.styles";

function App() {
  return (
    <Container>
      <Header />
      <Task />
      <Footer />
    </Container>
  );
}

export default App;
