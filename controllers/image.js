const handleImage = (req, res, db) => {   
    const { id } = req.body; 
    db('users').where('id', '=', id)  // = and not === because this is sql
    .increment('entries', 1)  //we increment the column entries by 1
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);  //this returns the entries instead of entries[0]- breaking change
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage
}