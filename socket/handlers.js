const User = require('../services/User');
const jwt = require('../lib/jwt');
exports.joinHandler = async (socket, data) => {
  // const { token } = data;
  const token = jwt.generateToken({ id: data.token });
  const { id, error } = jwt.validateToken(token);

  if (!error && id) {
    const user = await User.getOne(id);

    if (user) {
      socket.leave(id, () => {
        socket.join(id, () => {
          const connection = require('./index').connection();
          connection.sendEvent(id, 'join', {
            data: { message: 'Logged in socket!' },
          });
        });
      });
    }
  }
};
