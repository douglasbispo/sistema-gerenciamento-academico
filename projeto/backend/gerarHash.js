const bcrypt = require('bcryptjs');
const password = 'admin';
bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
        console.error(err);
    } else {
        console.log("Hash para 'admin':", hash);
    }
});