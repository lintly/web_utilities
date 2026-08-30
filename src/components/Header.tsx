import { Nav } from "react-bootstrap";
import { useLocation } from "react-router";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link href="/" active={location.pathname === "/"}>
            Home
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/localizer"
            active={location.pathname === "/localizer"}
          >
            PsuedoLocalization Generator
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/i18comparison"
            active={location.pathname === "/i18comparison"}
          >
            i18Next File Comparison
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/base64" active={location.pathname === "/base64"}>
            Base64 Encode/Decode
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/formatter"
            active={location.pathname === "/formatter"}
          >
            JSON Formatter
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/colorizer"
            active={location.pathname === "/colorizer"}
          >
            Colorizer
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/jwt" active={location.pathname === "/jwt"}>
            JWT Decode
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
