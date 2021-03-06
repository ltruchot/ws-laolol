
const mongoose = require('mongoose');

const Theme = mongoose.model('Theme');

exports.listThemes = function (req, res) {
  Theme.find({}, (err, theme) => {
    if (err) {
      res.send(err);
    }
    console.log(theme);
    res.json(theme);
  }).cache();
};

exports.createThemes = function (req, res) {
  const docs = [];
  req.body.forEach((theme) => {
    theme._userId = req.user._id;
    docs.push(new Theme(theme));
  });
  Theme.insertMany(docs).then((themes) => {
    res.json(themes);
  }, (err) => {
    console.log('error', err);
    res.status('400').send(err);
  });
};

exports.readTheme = function (req, res) {
  Theme.findById(req.params.themeId, (err, theme) => {
    if (err) {
      res.send(err);
    }
    res.json(theme);
  });
};

exports.updateTheme = function (req, res) {
  delete req.body._id;
  Theme.findOneAndUpdate({ _id: req.params.themeId }, req.body, { new: true }, (err, theme) => {
    if (err) {
      res.send(err);
    }
    res.json(theme);
  });
};

exports.deleteTheme = function (req, res) {
  Theme.remove({
    _id: req.params.themeId,
  }, (err, theme) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Theme successfully deleted', _id: req.params.themeId });
  });
};
