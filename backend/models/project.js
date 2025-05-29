const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    name :{ type : String , required:true , trim :true },
    description :{ type : String , required:true , trim :true },
    team :{ type : mongoose.Schema.Types.ObjectId , ref :'Team' , required:true },
    createdBy :{ type : mongoose.Schema.Types.ObjectId , ref :'User' , required:true },
    members :[{ type : mongoose.Schema.Types.ObjectId , ref :'User' }],

});
module.exports = mongoose.model('Project',projectSchema);

