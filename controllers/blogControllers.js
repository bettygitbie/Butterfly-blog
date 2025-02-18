const express = require('express')
const Blog = require('../models/blogs')

/** We will create different controller functions that can be called in the blogroutes.js 
 * blog_index, blog_details,blog_create_get, blog_create_post, blog_delete
*/

const blog_index = (req,res)=> {
    Blog.find().sort({createdAt: -1})
        .then((result)=> res.render('index', { title: 'All Blogs', blogs: result }))
        .catch((err)=> console.log(err))
}

const blog_details = (req,res)=> {
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=> res.render('details', {title : 'Blog detail', blog : result}))
        .catch((err)=> res.status(404).render('404', {title: '404'}))
}

const blog_create_get = (req,res)=> {
    res.render('create', {title: 'Create New Blog'});
}

const blog_create_post = (req,res)=> {
    //create a new instance of Blog
    const blog = new Blog(req.body)

    blog.save()
        .then((result)=> res.redirect('/blogs'))
        .catch((err)=>console.log(err))
}

const blog_delete = (req,res)=> {
    Blog.findByIdAndDelete(req.params.id)
        .then((result)=> res.json({redirect: '/blogs'}))
        .catch(err => console.log(err))
}

module.exports = {blog_index, blog_details, blog_create_get, blog_create_post, blog_delete}