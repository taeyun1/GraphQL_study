import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

// 쿼리로 변수 보내는 방법 1) 쿼리작성 후 API에 필요한 변수를 올바른 type으로 추가한 다음
const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;
// isLiked는 로컬 cache에만 있다고 알려주기 위해 isLiked @client -> 이렇게씀
const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

function Movie() {
  const { id } = useParams();
  // const client = useApolloClient(); => useQuery에 client추가해도 동일함
  // 쿼리로 변수 보내는 방법 2) 해당변수를 여기서 보내주면 됨.
  const {
    data,
    loading,
    client: { cache }, // 내부에 있는 cache를 가져오기 위해 설정
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      // Movie타입에서 어떤 field를 수정할지 Apollo한테 말해주면됨
      fragment: gql`
        fragment MovieFragment on Movie {
          title
          rating
          isLiked
        }
      `,
      data: {
        // title: data?.movie?.isLiked ? "기본" : "ㅋㅋ",
        // rating: 9.9,
        isLiked: !data.movie.isLiked, // 좋아요 토글 설정
      },
    });
  };

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>
          {data?.movie?.isLiked ? "Un Like" : "Like"}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}

export default Movie;

/*
스타일 컴포넌트 쓰기전

function Movie() {
  const { id } = useParams();

  // 쿼리로 변수 보내는 방법 2) 해당변수를 여기서 보내주면 됨.
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  console.log(data, loading);
  if (loading) {
    return <h1>데이터 불러오는 중...</h1>;
  }
  return (
    <div>
      <img src={`${data.movie.medium_cover_image}`} alt="" />
      <p>{data.movie.title}</p>
    </div>
  );
}

export default Movie;

*/
