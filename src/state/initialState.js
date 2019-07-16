import { Init } from 'lib/framework/Init';
import { Movie } from 'lib/models';

export const initialState = {
    Init: new Init({
        id: 0,
        text: ''
    }),
    Movie: new Movie({
        id: 0,
        title: '',
        imdb_id: '',
        popularity: 0
    })
};
