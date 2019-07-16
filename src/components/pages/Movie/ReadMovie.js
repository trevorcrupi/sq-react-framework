import React, { Fragment } from 'react';
import { Card, CardText, CardGroup, CardSubtitle, CardBody, UncontrolledCarousel } from 'reactstrap';
import { useModel } from 'lib/framework/hooks';
import { Movie } from 'lib/models';

export const ReadMovie = props => {
    let items = [
      {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 1',
        caption: 'Slide 1',
        header: 'Slide 1 Header'
      }
    ];

    const { movie } = useModel('Movie', new Movie({}).read({
      id: props.id
    }));

    if(movie) {
      items = [
        {
          src: 'https://image.tmdb.org/t/p/w185' + movie.get('backdrop_path'),
          altText: movie.title,
          caption: 'Popularity Index: ' + movie.popularity,
          header: movie.title
        }
      ];
    }

    return (
        <Fragment>
            <UncontrolledCarousel items={items} />
            <h1 style={{ padding: '1.25rem' }}>{movie.get('title')}</h1>
            <CardGroup>
              <Card key={movie.get('imdb_id')}>
                <CardBody>
                  <CardSubtitle>Popularity Index: {movie.get('popularity')}</CardSubtitle>
                  <CardText>{movie.overview}</CardText>
                </CardBody>
              </Card>
            </CardGroup>
        </Fragment>
    );
}
