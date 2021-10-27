//conection logic to the MongoDB database
const mongoose=require('mongoose');

//mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/Bakalarka', {
    useNewUrlParser: true,
    });

mongoose.connection.once('open', () =>{
    console.log("Ok");
}).on('error', (e) =>{
    console.log(e);
});

module.exports= {
    mongoose
};