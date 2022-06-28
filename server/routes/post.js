const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

//@route GET /api/posts
//@desc Read post
//@access private(Phải login mới read post được)

router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


//@route POST /api/posts
//@desc Create post
//@access private(Phải login mới tạo post được)

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    //Validate
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' })
    }

    try {
        const newPost = await new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        })
        await newPost.save()

        res.json({ success: true, message: 'Post created successfully!', post: newPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route PUT /api/posts
//@desc update post
//@access private(Phải login mới PUT post được)

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    //Validate
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' })
    }

    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        }

        const updatedPostCondition = {
            _id: req.params.id,
            user: req.userId
        }

        updatedPost = await Post.findOneAndUpdate(updatedPostCondition, updatedPost, { new: true })

        // 
        if (!updatedPost) {
            res.status(401).json({ success: false, message: 'Post not found or user not authorised' })
        } else {
            res.json({ success: true, message: 'Post updated successfully!', post: updatedPost })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


//@route DELETE /api/posts
//@desc delete post
//@access private(Phải login mới delete post được)

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletePostCondition = { _id: req.params.id, user: req.userId }

        const deletedPost = await Post.findOneAndDelete(deletePostCondition)

        if (!deletedPost) {
            res.status(401).json({ success: false, message: 'Post not found or user not authorised' })
        }

        res.json({ success: true, post: deletedPost, message: 'Post deleted successfully!' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
module.exports = router