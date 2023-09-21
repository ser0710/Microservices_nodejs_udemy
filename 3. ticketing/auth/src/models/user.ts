import mongoose from "mongoose";
import { Passowrd } from "../services/password";

// 1. An interface that describes the properties that are required to create a User
interface UserAttrs{
    email: string;
    password: string;
}

// 4. An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> { // 8. replaced all any with UserDoc
    build(attrs: UserAttrs): UserDoc;
}

// 6. An interface that describes the properties that a user document has (prevent the default properites that mongo add.. i think)?
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: { //9. custom the schema of the data that the db returns)?
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')){
        const hashed = await Passowrd.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => { // 2. make this because we want that typescript checks the type of the arguments
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema); // 7. replaced <any, UserModel> by <UserDoc, UserModel>

// 3. User.build({}) // typescript does not undertand what it means to asign a property to the statics object
// it was necessary to add <any, UserModel> and the interface UserModel

// User.build({ // 5. now it works
//     email: 'a',
//     password: 'a'
// })

export { User };

