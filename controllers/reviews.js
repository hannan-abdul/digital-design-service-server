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

//delete api


module.exports ={
    addreviews,
    allreviews
}