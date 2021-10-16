const Services = require("../models/Services");

//add services api
const addservice = async (req, res) => {
    try {
        const newService = new Services({
            name: req.body.name,
            email: req.body.email,
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

//get all services list
const allservices = async (req, res) => {
    try {
        const services = await Services.find()
        res.status(200).json(services)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

//delete service
const deleteservice = async (req, res) => {
    try {
        const service = await Services.findById(req.params.id);
        if (service.email === req.body.email) {
            try {
                await service.delete();
                res.status(200).json("Service has been deleted");
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can delete only your Service");
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}
// update service 
const updateService = async (req, res) => {
    try {
        const service = await Services.findById(req.params.id);
        if (service.email === req.body.email) {
            try {
                const updateservice = await Services.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updateservice);
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

// get single service 
const singleservice = async (req, res) => {
    let serviceId = req.params.id;
    try {
        const serviceItem = await Services.findById(serviceId);
        res.status(200).json(serviceItem)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
};



module.exports = {
    addservice,
    allservices,
    singleservice,
    deleteservice,
    updateService
}

