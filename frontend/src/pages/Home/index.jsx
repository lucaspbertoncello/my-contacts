import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/delete.svg";

export default function Home() {
  return (
    <div>
      <input
        className="h-12 px-4 mt-12 w-full bg-white outline-0 rounded-3xl drop-shadow-sm"
        type="text"
        placeholder="Search contact..."
      />

      <div className="mt-8">
        {/* contact list header */}
        <header className="flex justify-between items-center mb-4">
          <strong className="font-bold text-2xl text-font-900">
            3 contatos
          </strong>

          <a
            href="/"
            className="text-main font-bold px-4 py-2 border-2 rounded-md transition-all hover:bg-main hover:text-white"
          >
            Add new contact
          </a>
        </header>
        {/* contact list header */}

        {/* contact list area */}
        <div>
          <header>
            <button className="flex items-center">
              <span className="mr-2 text-main font-bold">Nome</span>{" "}
              <img src={arrow} alt="" />
            </button>
          </header>

          {/* card */}
          <div className="flex items-center justify-between mt-2 mb-2 bg-white p-4 border border-white rounded-sm drop-shadow-sm">
            {/* card info */}
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <strong className="text-lg text-font-900">
                  Lucas Bertoncello
                </strong>
                <small className="bg-main-lighter text-main font-bold px-2 py-1 uppercase rounded-sm ml-3">
                  Instagram
                </small>
              </div>

              <span className="text-sm text-font-200">lucas@gmail.com</span>
              <span className="text-sm text-font-200">(41) 99525-7119</span>
            </div>
            {/* card info */}

            {/* actions */}
            <div className="flex gap-4">
              <a href="/">
                <img src={edit} alt="Edit" />
              </a>
              <button>
                <img src={trash} alt="Delete" />
              </button>
            </div>
            {/* actions */}
          </div>
          {/* card */}
        </div>
        {/* contact list area */}
      </div>
    </div>
  );
}
