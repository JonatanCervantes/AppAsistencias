const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cursoSchema = new Schema({
    semestre:{ 
        type:String,   
        trim:true, 
        minlength:1,
        required: [true, 'El periodo del semestre es necesario'],

    },
    nombre:{ 
        type:String,   
        trim:true, 
        minlength:4,
        required: [true, 'El nombre del curso es necesario'],
    },

    clave:{ 
        type:String, 
        trim:true, 
        minlength:4,
        required: [true, 'La clave del curso es necesaria'],

    },

    unidades:{ 
        type:Number, 
        max:9,
        required:[true, 'El Numero de unidades es necesario'],
<<<<<<< HEAD
    },
    
    //grupo: [{
       // text: String,
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'Grupo'
   // }]
=======
    },    
        
    // grupos: [{
    //    type: mongoose.Schema.ObjectId, ref:'Grupo'
    // }],
>>>>>>> 1d232012274c88b4965bf65d250c2671956aad89
},{
    timestamps:true
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;