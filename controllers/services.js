const Services = require("../models/Services");

//add services api
const addservice = async (req, res) => {
    try {
        const newService = new Services({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            photo: req.body.photo,
        });
        const newservice = await newService.save();
        res.status(200).json(newservice);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

//all services list
const allservices = async ( req, res)=>{
    try{
        const services = await Services.find()
        res.status(200).json(services)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

//delete api


module.exports ={
    addservice,
    allservices
}

