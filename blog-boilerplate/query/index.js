const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

/**
 * EXAMPLE:
 * posts = {
 *  'ds23fs': {
 *      id: 'ds23fs',
 *      title: 'post title',
 *      comments: [
 *          {id: 'as89dv', content: 'comment content'}
 *      ]
 *  }
 * }
 */

app.get('/posts', (req, res) =>{
    res.send(posts);
});

app.post('/events', (req, res) =>{
    const { type, data } = req.body
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts[id] = { id, title, comments:[] };
    } else if(type === 'CommentCreated'){
        const { id, content, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content });
    }
    res.send({});
});

app.listen(4002, () =>{
    console.log('listening on 4002')
})