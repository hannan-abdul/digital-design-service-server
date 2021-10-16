const Reviews = require("../models/Reviews")

//add reviews api
const addreviews = async (req, res) => {
    try {
        const newReview = new Reviews({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            description: req.body.description,
            photo: req.body.photo,
        });
        const newreview = await newReview.save();
        res.status(200).json(newreview);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

//all reviews list
const allreviews = async ( req, res)=>{
    try{
        const reviews = await Reviews.find()
        res.status(200).json(reviews)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

//delete review
const deletereview = async (req, res) => {
    try {
        const review = await Reviews.findById(req.params.id);
        if (review.email === req.body.email) {
            try {
                await review.delete();
                res.status(200).json("Review has been deleted");
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can delete only your Review");
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}
// update review
const updateReview = async (req, res) => {
    try {
        const review = await Reviews.findById(req.params.id);
        if (review.email === req.body.email) {
            try {
                const updatereview = await Reviews.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatereview);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your Review");
        }
    } catch (err) {
        res.status(500).json(err)
    }
}


module.exports ={
    addreviews,
    allreviews,
    deletereview,
    updateReview
}