import "../../App.css";

const Loader = ({ className = "", wrapperClass = "" }) => {
  return (
    <div className={wrapperClass}>
      <div className={`loader ${className}`}></div>
    </div>
  );
};

export default Loader;