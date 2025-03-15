const handleSignin = (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            if (data.length) {   //Checks if user exists
                const isValid = bcrypt.compareSync(req.body.password, data[0].hash); // true
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
         }})
         .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports ={
    handleSignin: handleSignin
}