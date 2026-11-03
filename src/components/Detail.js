import styled from "styled-components";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom to access route parameters
import { useEffect, useState } from "react"; // Import useEffect and useState from React for managing state and side effects
import db from "../firebase"; // Import the Firebase database instance

const Detail = (props) => {
  const { id } = useParams(); // Get the route parameter 'id'
  const [detailData, setDetailData] = useState(null); // State to store the movie data

  useEffect(() => {
    // Fetch movie data based on the 'id' parameter
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data()); // Set the movie data if the document exists
        } else {
          console.log("No such document!"); // Log if the document does not exist
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data: ", error); // Log any errors that occur during the fetch operation
      });
  }, [id]);

  return (
    <Container>
      <Background>
        <img src={detailData?.backgroundImg} alt={detailData?.title} />
      </Background>

      <ImageTitle>
        <img src={detailData?.titleImg} alt={detailData?.title} />
      </ImageTitle>

      <ContentMeta>
        <Controls>
          <Player>
            <img src="/assets/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/assets/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/assets/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData?.subTitle}</SubTitle>
        <Description>{detailData?.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);
  display: block;
  position: relative;
  overflow-x: hidden;
  top: 72px;
`;

const Background = styled.div`
  position: fixed;
  opacity: 0.8;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0 auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0 22px 0 0;
  padding: 0 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  transition: all 0.3s ease;

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
    scale: 1.08;
  }

  &:active {
    scale: 0.95;
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;
    margin: 0 10px 0 0;

    img {
      background: rgb(249, 249, 249);
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.1s ease-in;

  & span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      width: 16px;
      transform: translate(1px, 0px) rotate(0deg);
    }

    &:nth-child(2) {
      height: 16px;
      width: 2px;
      transform: translateX(-8px) rotate(0deg);
    }
  }

  &:hover {
    scale: 1.08;
  }

  &:active {
    scale: 0.95;
  }
`;

const GroupWatch = styled(AddList)``;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
