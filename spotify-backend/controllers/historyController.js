const History = require("../models/History");


// Add Song To History

const addHistory = async (req,res)=>{

  try{

    const {songId} = req.params;


    const history = await History.create({

      user:req.user._id,

      song:songId

    });


    res.status(201).json({

      success:true,

      history

    });


  }catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};




// Get User History

const getHistory = async(req,res)=>{

  try{


    const history = await History.find({

      user:req.user._id

    })
    .populate({

      path:"song",

      populate:[
        {
          path:"artist"
        },
        {
          path:"album"
        }
      ]

    })
    .sort({
      createdAt:-1
    });



    res.status(200).json({

      success:true,

      history

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};



module.exports = {

 addHistory,

 getHistory

};