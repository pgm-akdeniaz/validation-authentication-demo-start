// import the User model
import User from "../../models/User.js";

/**
 * Get all the users
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    const users = await User.query().withGraphFetched("[meta, role]");

    // get the interests and return them with status code 200
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Get a single user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const show = async (req, res, next) => {
  try {
    const user = await User.query()
      .findById(req.params.id)
      .withGraphFetched("[meta, role]");

    // get the interests and return them with status code 200
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Store a new user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const store = async (req, res, next) => {
  try {
    const user = await User.query().insert(req.body);

    // get the interests and return them with status code 200
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Update a user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const update = async (req, res, next) => {
  try {
    const user = await User.query().patchAndFetchById(req.params.id, req.body);

    // get the interests and return them with status code 200
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Delete a user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

export const destroy = async (req, res, next) => {
  try {
    const user = await User.query().deleteById(req.params.id);

    // get the interests and return them with status code 200
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
