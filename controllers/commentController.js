const commentModel = require('../models/Comment');
const newsModel = require('../models/News');
const createError = require('../utils/error-message');

const allComment = async (req, res, next) => { 
    try {
        let comments;

        if(req.role === 'admin') {
            comments = await commentModel.find().populate('article', 'title').sort({ timesStamps: -1 });
        }else{
            const news = await newsModel.find({ author: req.id });
            // res.json({ news });
            const newsId = news.map(item => item._id);
            comments = await commentModel.find({ article: { $in: newsId } })
                                        .populate('article', 'title')
                                        .sort({ timesStamps: -1 });
        }

        // res.json({ comments });
        res.render('admin/comments', { comments, role: req.role });
    } catch (error) {
        next(createError('Failed to retrieve comments.', 500));
    }
};

const updateCommentStatus = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const { status } = req.body;

        const comment = await commentModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!comment) {
            return next(createError('Comment not found.', 404));
        }

        res.json({ success: true});
    } catch (error) {
        next(createError('Failed to update comment status.', 500));
    }

};

const deleteComment = async (req, res, next) => { 
    try {
        const { id } = req.params;

        const comment = await commentModel.findByIdAndDelete(id);

        if (!comment) {
            return next(createError('Comment not found.', 404));
        }

        res.json({ success: true });

    } catch (error) {
        next(createError('Failed to delete comment.', 500));
    }
};


module.exports = {
    allComment,
    updateCommentStatus,
    deleteComment
}
