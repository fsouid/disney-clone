import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";
import db from "../firebase";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      let recommend = [];
      let newDisney = [];
      let originals = [];
      let trending = [];

      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommend.push({ id: doc.id, ...doc.data() });
            break;
          case "new":
            newDisney.push({ id: doc.id, ...doc.data() });
            break;
          case "original":
            originals.push({ id: doc.id, ...doc.data() });
            break;
          case "trending":
            trending.push({ id: doc.id, ...doc.data() });
            break;
          default:
            break;
        }
      });
      dispatch(
        setMovies({
          recommend: recommend,
          newDisney: newDisney,
          original: originals,
          trending: trending,
        }),
      );
    });
  }, [dispatch, userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  display: block;
  top: 72px;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/assets/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;