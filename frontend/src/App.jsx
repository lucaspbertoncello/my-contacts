import { BrowserRouter as Router } from "react-router-dom";

import Container from "./components/Container";
import Header from "./components/Header";
import Routes from "./Routes";

export default function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Routes />
      </Container>
    </Router>
  );
}
