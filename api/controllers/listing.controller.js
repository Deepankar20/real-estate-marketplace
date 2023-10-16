import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next)=>{

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
        
    } catch (error) {
       
        next(error);
    }
}

export const deleteListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);

    if(!listing) return next(errorHandler(404, 'Listing not found'));
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own listing'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        
    } catch (error) {
        next(error);
    }

}

export const updateListing = async(req, res, next) =>{
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'Listing Not Found'));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You Can Only Update Your Own Listing'));
    }

    try {

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );

        res.status(201).json({msg: "updated successfully"});
        
    } catch (error) {
        
        next(error);
    }
}


export const getListingId = async (req, res, next) =>{
    const data = await Listing.findById({_id : req.params.id});

    if(!data) res.status(404).json({msg: "listing not found"});
    
    res.status(201).json(data);
}