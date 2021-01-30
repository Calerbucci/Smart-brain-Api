
const handleSignin = (req, res, db, bcrypt) => {

    const {email, password} = req.body;

    if(!email || !email){
        return res.status(400).json('Input field cannot be empty');
     }
    
    return  db.select('email', 'hash').from('login')
      .where('email', '=' ,email)
      .then(data => {
        const isValid =  bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            db
            .select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('wrong credential'));
        }
              else{
                  res.status(400).json('wrong credential');
              }
         });
  }


  module.exports = {
      handleSignin: handleSignin
  }