import "./ButtonCreate.scss";
import ButtonPlus from "../../ui/ButtonPlus/ButtonPlus";
import { Link } from "react-router-dom";

const ButtonCreate = () => {
  return (
    <> 
      <div className="button-create d-flex flex-column align-items-center mt-5">
        <Link to="/register">  {/* Link для указания точки маршрута, которая записана в Route.  */}
          <ButtonPlus />
        </Link>
      </div>
    </>
  );
};

export default ButtonCreate;
