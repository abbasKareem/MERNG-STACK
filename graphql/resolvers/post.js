const Post = require('../../models/Post.js')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()
        return posts
      } catch (error) {
        throw new Error(error)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
