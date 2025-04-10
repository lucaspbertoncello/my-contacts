import logo from "../assets/images/logo.svg";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center mt-20 mb-12">
      <img src={logo} alt="myContacts" />
    </header>
  );
}
