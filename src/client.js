// const { AplloClient } = require("@apollo/client");
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;

// cache: new InMemoryCache() => Apollo가 쿼리들을 저장해줌, 쿼리 결과가 브라우저의 메모리에 있는 cache에 저장됨.
// 즉, 화면을 한번 가져오면 다른 화면으로 이동했다가 다시 돌아왔을 때, 데이터를 다시 가져오지 않아도됨

/* 
쿼리를 이용해 데이터 가져와지나 콘솔에 찍어보기 (테스트)
client
  .query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `,
  })
  .then((data) => console.log(data));
	*/
