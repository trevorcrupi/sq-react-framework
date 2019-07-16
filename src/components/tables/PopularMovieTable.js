import React, { memo } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody } from 'reactstrap';
import { Link } from '@reach/router';

import { useModel } from 'lib/framework/hooks';
import { MovieCollection } from 'lib/collections';
import { Movie } from 'lib/models';

export const PopularMovieTable = memo(props => {
  let movies;
  const { movieCollection } = useModel('MovieCollection', new MovieCollection({}).fill(Movie));

  if(movieCollection) {
    movies = movieCollection.movies.map((movie, index) => {
      if(index < 5) {
        return (
          <Card key={movie.get('id')}>
            <CardImg top width="100%" src={'https://image.tmdb.org/t/p/w185' + movie.get('poster_path')} alt="Card image cap" />
            <CardBody>
              <CardTitle><strong>{movie.get('title')}</strong></CardTitle>
              <CardSubtitle>Popularity Index: {movie.get('popularity')}</CardSubtitle>
              <hr />
              <CardText>{movie.overview}</CardText>
              <Link to={'/movie/' + movie.id}>
                <Button color='primary'>See Movie</Button>
              </Link>
            </CardBody>
          </Card>
        );
      }

      return '';
    });
  }

  return (
    <CardGroup>
      {movies}
    </CardGroup>
  );
});
