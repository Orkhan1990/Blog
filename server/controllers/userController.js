

export const getUsers=async(req,res,next)=>{
    try {

        res.status(200).json({message:"Isleyir"});
        
    } catch (error) {
           next(error)
    }
}