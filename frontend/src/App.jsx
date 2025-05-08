import { BrowserRouter as Router } from "react-router-dom";

import Container from "./components/Container";
import Header from "./components/Header";
import Routes from "./Routes";

import ToastContainer from "./components/Toast/ToastContainer";

export default function App() {
  return (
    <Router>
      <ToastContainer />

      <Container>
        <Header />
        <Routes />
      </Container>
    </Router>
  );
}
