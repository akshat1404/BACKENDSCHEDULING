exports.followedSchedule = async (req, res) => {
    try {
      const config = await User.findOne({ email: req.body.email });
      if (!config) {
        return res.status(400).json({ msg: 'User does not exist' });
      }
      res.json(config);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }