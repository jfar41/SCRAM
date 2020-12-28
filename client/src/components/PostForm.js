import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [ createPost, { error }]= useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            console.log(JSON.stringify(values));
            // console.log('This is "result" in PostForm.js: '+ JSON.stringify(result))
            // console.log('This is data: '+ JSON.stringify(data))
            // console.log('This is result.data.createPost: '+ JSON.stringify(result.data.createPost))
            // console.log('This is data.getPosts: '+ JSON.stringify(data.getPosts))

            // data.getPosts = [result.data.createPost, ...data.getPosts];

            // data = [result.data.createPost, ...data.getPosts];
            const myNewPost = result.data.createPost
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, 
                data: {
                    getPosts: [myNewPost, ...data.getPosts
                    ],
                },
            });
            values.body = ''
        }
    })

    function createPostCallback() {
        createPost();
    }
    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World!"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>

            </Form.Field>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdAt username
        likes {
            id username createdAt
        }
        likeCount
        comments{
            id body username createdAt
        }
        commentCount
    }
}
`;

export default PostForm;