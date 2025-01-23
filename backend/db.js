const mongoose=require('mongoose');
mongoose.connect('');

const userSchema=new mongoose.Schema({
    username: String,
    password: String,
    firstaName: String,
    lastName: String
});

const User=mongoose.model('User', userSchema);

module.expots={
    User
}