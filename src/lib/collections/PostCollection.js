import { Collection } from 'lib/framework/Collection';

export default class PostCollection extends Collection {
    constructor(postCollection) {
        super({
            collection: 'PostCollection',
            model: 'Post',
            driver: 'local',
            posts: postCollection
        });
    }
}