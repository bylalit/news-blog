const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const settingModel = require('../models/Setting');
const NodeCache = require('node-cache')

const cache = new NodeCache();

const loadCommonData = async (req, res, next) => {
    try {
        var latestNews = cache.get('latestNewsCache')
        var categories = cache.get('categoriesCache')
        var settings = cache.get('settingsCache')

        if(!latestNews && !categories && !settings){
            latestNews = await newsModel.find()
                                                .populate('category', { 'name': 1, 'slug': 1 })
                                                .populate('author', 'fullname')
                                                .sort({ createdAt: -1 }).limit(5).lean();
            settings = await settingModel.findOne().lean()
        
            const categoriesInUse = await newsModel.distinct('category');
            categories = await categoryModel.find({ _id: { $in: categoriesInUse }}).lean();

            cache.set('latestNewsCache', latestNews, 3600)
            cache.set('categoriesCache', categories, 3600)
            cache.set('settingsCache', settings, 3600)
        }

        res.locals.settings = settings;
        res.locals.latestNews = latestNews;
        res.locals.categories = categories;

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = loadCommonData;
