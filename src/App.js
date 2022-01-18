import { useState } from 'react';
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
import axios from 'axios';
const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Header = styled.div`
display: flex;
flex-direction: row;
background-color: black;
color: white;
padding: 20px;
font-size: 30px;
font-weight:bold;
box-shadow: 0 3px 6px 0 #555;
justify-content: space-between;

`;

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const SearchBox = styled.div`
display: flex;
flex-direction: row;
background-color:white;
padding: 10px 10px;
border-radius: 8px;
margin-left:20px;
width:50%;

`;
const SearchInput = styled.input`
color: black;
font-size: 16px;
font-weight:bold;
border: none;
outline: none;
margin-left:15px;
`;

const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content: space-evenly;

`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
 export const API_KEY= '77d7a74'
function App() {
  
  
  const [searchQuery, updateSearchQuery]= useState();
  const [timeoutId, updatetimeoutId]= useState();
  const [movieList,updateMovieList] = useState([]);
  const [selectedMovie,onMovieSelect] = useState();

const fetchData = async (searchString) => {
const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);

updateMovieList(response.data.Search);
};

const onTextChange = (event) =>{
  clearTimeout(timeoutId);
  updateSearchQuery(event.target.value);
  const timeout = setTimeout(()=>fetchData(event.target.value),500);
  updatetimeoutId(timeout);

};


  return (
    <Container>

      <Header>
        <AppName>
        <MovieImage src="/react-movie-app/movie-icon.svg" />
        Movie App</AppName>
        <SearchBox>
          <SearchInput placeholder="Search for Movie" value= {searchQuery} onChange ={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/react-movie-app/movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>

  )

}

export default App;
