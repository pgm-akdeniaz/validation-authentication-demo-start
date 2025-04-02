export const getExample = async (req, res) => {
  res.render("example-form", {});
};

export const postExample = async (req, res, next) => {
  const action = req.body.action;

  // validate the action
  const validActions = ["update", "delete", "check"];
  if (!validActions.includes(action)) {
    return res.status(400).send("Invalid action");
  }

  // handle the action based on the request
  switch (action) {
    case "update":
      return update(req, res, next);
    case "delete":
      return destroy(req, res, next);
    case "check":
      return check(req, res, next);
  }

  // if no action is found, return a 404
  return res.status(404).send("Not found");
};

const update = async (req, res, next) => {
  res.send("we can update now");
};

const destroy = async (req, res, next) => {
  res.send("we can delete now");
};

const check = async (req, res, next) => {
  res.send("we can check now");
};
