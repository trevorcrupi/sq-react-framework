import Model from 'lib/framework/Model';
import ActionGenerator from 'lib/framework/Model/ActionGenerator';

export default class Post extends Model {

    constructor(post) {
        super({ 
            model: 'Post', 
            driver: 'local', 
            schema: {
                id: ['generate:uuid', post.id],
                title: ['string', post.title],
                author: ['number', post.author],
                date: ['string', post.date],
                text: ['string', post.text]
            }
        });
    }

    create(callback, plugins) {
        return super.create({
            table: 'posts',
            insert: {
                id: this.id,
                title: this.title,
                author: this.author,
                date: this.date,
                text: this.text
            },
            callback,
            plugins
        });
    }

    getAllPosts(callback, plugins) {
        let posts = [];
        const postsArray = super.getDriver().getAllPosts();
        for(let i = 0; i < postsArray.length; i++) {
            posts.push(new Post(postsArray[i]));
        }

        return new ActionGenerator({
            type: ['model', 'PostCollection', 'read'],
            value: posts
        }).ready();
    }
}