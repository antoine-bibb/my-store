import mongoose from'mongoose';

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    }
},{
    timestamps: true,

});

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    brand:{
        type: String,
        required: [true, 'Please add a brand']
    },
    category:{
        type: String,
        required: [true, 'Please add a category']
    },
    description:{
        type: String,
        required: [true, 'Please add a description']
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        default: 0
    },
    numReviews: {
        type: Number,
        required: [true, 'Please add a number of reviews'],
        default: 0
    },
    price:{
            type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    countInStock:{
        type: Number,
        required: [true, 'Please add a count in stock'],
        default: 0
    },
    color:{
        type: String,
        required: [true, 'Please add a color'],
        default: 'black'
    },
    size:{
        type: String,
        required: [true, 'Please add a size'],
        default: 'xs'
    }

},{
    timestamps: true,
});

const product = mongoose.model('Product', productSchema);

export default product;