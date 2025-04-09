import logo from "../assets/images/logo.svg";

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center mt-20">
      <img src={logo} alt="myContacts" />

      <input
        className="h-12 px-4 mt-12 w-full max-w-[500px] bg-white outline-0 rounded-3xl drop-shadow-sm"
        type="text"
        placeholder="Search contact..."
      />
    </header>
  );
}
