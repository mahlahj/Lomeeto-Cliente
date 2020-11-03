import React from "react";
import "./Header.scss";
import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/png/instaclone.png";
import RightHeader from "./RightHeader";
import Search from "./Search";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header_logo">
            <Link to="/">
              <Image src={Logo} alt="Logo" />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
            <Search />
          </Grid.Column>
          <Grid.Column width={3}>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
