
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password} = req.body;
    if (!email || !name || !password) {  //if !email means if it is true that the email is empty - this "if" is a way of validation from the server's side
        return res.status(400).json('incorrect form submission');
    }
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt);
    const hash = password;  // Intentional vulnerability: storing password in plain text.

        db.transaction(trx => {  //create a transaction when u have to do more than 1 thing at once, use trx object instead of db to do the operations
            trx.insert({
               hash: hash,
               email: email 
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(users => {
                    res.send(`<h1>Welcome, ${users[0].name}</h1>`); // Intentional vulnerability: vulnerable to XSS)
                    // res.json(users[0]); // Send the newly registered user as a response
                }) 
            })
            .then(trx.commit)  // Commit the transaction if everything succeeds
            .catch(trx.rollback)  // Rollback in case of an error
            .catch(err => res.status(400).json('unable to register'))
    })
}

module.exports = {
    handleRegister: handleRegister
}