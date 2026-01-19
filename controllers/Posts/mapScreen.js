const queries = require('../../crudOperations/Posts/mapScreen.js');

const getAllPosts = async (req, res) => {
    try {
        const id  = req.params.id;
        const posts = await queries.getAllPosts(id);
        const post = JSON.stringify(posts)
        console.log(post)
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {getAllPosts};