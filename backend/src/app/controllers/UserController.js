import User from '../models/Users';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async find(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    return res.json(user);
  }

  async store(req, res) {
    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com este email' });
    }

    const { id, name, email, provider, whatsapp, city, uf } = await User.create(
      req.body
    );

    return res.json({ id, name, email, provider, whatsapp, city, uf });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (user.email !== email) {
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com este email' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'A Senha antiga está icorreta' });
    }

    await user.update(req.body);

    const { id, name, provider, whatsapp, city, uf } = await User.findByPk(
      req.userId
    );

    return res.json({ id, name, email, provider, whatsapp, city, uf });
  }
}

export default new UserController();
