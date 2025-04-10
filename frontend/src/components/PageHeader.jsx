import PropTypes from "prop-types";

import arrow from "../assets/images/icons/arrow.svg";

// component to create and update contact page
export default function PageHeader(props) {
  return (
    <div className="">
      <a href="/" className="flex items-center gap-2">
        <img className="rotate-[-90deg]" src={arrow} alt="Back" />
        <span className="text-main font-semibold">Voltar</span>
      </a>

      <h1 className="text-2xl text-font-900 font-bold my-3">{props.title}</h1>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
