import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
              return validator.isMobilePhone(value, 'any', { strictMode: false });
            },
            message: "Please provide a valid mobile phone number."
          }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
              return validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
              });
            },
            message: "Please provide a valid password with at least 8 characters, including uppercase, lowercase, numbers, and symbols."
          },
        select: false
    }
}, 
{ timestamps: true })

//Indexing
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });


userSchema.pre('save', async function (next) {
    const user = this;

    if(!user.isModified("password")){
        console.log('IsModified is not defined ')
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    try{
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

export const User = mongoose.model('User', userSchema);