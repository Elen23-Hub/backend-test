const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {  
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            if (data.length) {   //Checks if user exists
                const isValid = bcrypt.compareSync(password, data[0].hash); // true
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
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