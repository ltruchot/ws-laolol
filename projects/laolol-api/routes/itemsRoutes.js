const passport = require('passport');
const passportService = require('../passport');
const users = require('../controllers/usersController');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
module.exports = function (app) {
  const items = require('../controllers/itemsController');
  app.route('/api/items')
    .get(items.listItems)
    .post(requireAuth, (req, res) => {
      const code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
      if (code === 201 && req.body instanceof Array) {
        items.createItem(req, res);
      } else {
        res.status('400').json({ error: 'Invalid data' });
      }
    });

  app.route('/api/items/:itemId')
    .get(items.readItem)
    .put(requireAuth, requireAuth, (req, res) => {
      const code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
      if (code === 201) {
        items.updateItem(req, res);
      } else {
        res.status('400').json({ error: 'Invalid ids' });
      }
    })
    .delete(requireAuth, (req, res) => {
      const code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
      if (code === 201) {
        items.deleteItem(req, res);
      } else {
        res.status('400').json({ error: 'Invalid ids' });
      }
    });
};
