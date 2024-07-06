const { User } = require('../model/User');

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json( {phone:doc.phone,role:doc.role,id:doc._id});
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { phone: req.query.phone },
    );
    // TODO: this is just temporary, we will use strong password auth
    if (!user) {
      res.status(401).json({ message: 'No such user exists' });
    } else if (user.password === req.body.password) {
      res.status(200).json({id:user.id, phone:user.phone, name:user.name,addresses:user.addresses , role: user.role});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};