import { Button, Container } from "./components";
import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import useDocumentModelStore from "../hooks/useDocumentModelStore";
import { MdGroupAdd } from "react-icons/md";

const Navbar = () => {
  const { openDocumentModel } = useDocumentModelStore();
  const { invite } = useAuthStore();
  return (
    <>
      <nav className="w-full bg-white shadow-md">
        <Container>
          <div className="py-3 flex justify-between items-center">
            <span className="font-bold">
              <Link to={"/"}>Collab</Link>
            </span>
            <div className="btns flex gap-3">
              <span>
                {invite && (
                  <span onClick={() => openDocumentModel()}>
                    <Button label={"Invite"}>
                      <MdGroupAdd />
                    </Button>
                  </span>
                )}
              </span>
              <Link to={"/signout"}>
                <Button label={`Sign out`} />
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
