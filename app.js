const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = "mongodb://127.0.0.1:27017/shop";

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions"
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret value',
    resave: false,
    saveUnitialized: false,
    store: store
}));


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// main()
//     .then(result => {
//         app.listen(3000);
//     })
//     .catch(err => console.log(err));
//
// async function main() {
//     await mongoose.connect('mongodb+srv://YeliazarKazhura:GaJkQF4NUj6Gm5Qh@cluster0.hior4.mongodb.net/?retryWrites=true&w=majority');
//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI)
    .then(() => {
        User.findOne().then(user => {
            if(!user) {
                const user = new User({
                    name: 'Yeliazar',
                    email: 'test@test.by',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
    console.log('Connected!');
    app.listen(3000);
})
    .catch(err => console.log(err));

// mongoose.connect('mongodb+srv://YeliazarKazhura:GaJkQF4NUj6Gm5Qh@cluster0.hior4.mongodb.net/?retryWrites=true&w=majority')
//     .then(() => {
//         console.log('Connected!');
//         app.listen(3000);
//     })
//     .catch(err => console.log(err));
