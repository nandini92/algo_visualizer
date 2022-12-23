import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <Container>
            <Nav to={"/gs-algo"}>Gale–Shapley</Nav>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 50px;
    background: linear-gradient(120deg, #e60ee6, #00005e);
    display: flex;
    align-items: center;
`;
const Nav = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-size: 22px;
    margin: 10px;
`;
export default Header;