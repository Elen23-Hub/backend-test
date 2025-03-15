
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
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
                .then(user => {
                    res.json(user[0]); // Send the newly registered user as a response
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