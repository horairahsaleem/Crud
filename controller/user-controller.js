import User from '../model/user.js';

export const getProducts = async (request, response) => {
    try{
        const products = await User.find();
        response.status(200).json(products);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const addProducts = async (request, response) => {
    const products = request.body;
    
    const newproducts = new User(products);
    try{
        await newproducts.save();
        response.status(201).json(newproducts);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}



export const editProduct = async (request, response) => {
    let products = request.body;

    const editproduct = new User(products);
    try{
        await User.updateOne({_id: request.params.id}, editproduct);
        response.status(201).json(editproduct);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteproduct = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("product deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}