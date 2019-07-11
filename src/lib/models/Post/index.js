import Model from 'lib/framework/Model';
import ActionGenerator from 'lib/framework/Model/ActionGenerator';

export default class Post extends Model {

    constructor(post) {
        super({ 
            model: 'Post', 
            driver: 'local', 
            schema: {
                id: ['generate:uuid', post.id],
                title: ['dynamic', post.title],
                author: ['dynamic', post.author],
                date: ['dynamic', post.date],
                text: ['dynamic', post.text]
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

    get(value) {
        return this[value] ? this[value] : '...';
    }
}