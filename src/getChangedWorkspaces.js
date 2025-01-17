const { resolve } = require("path");

const { getChangedFiles } = require("./getChangedFiles");
const { getTouchedDependencies } = require("./getTouchedDependencies");
const { getWorkspaces } = require("./getWorkspaces");

const getChangedWorkspaces = async ({ fromBranch, branch, projectRoot }) => {
  const path = resolve(projectRoot);
  const [workspaces, files] = await Promise.all([
    getWorkspaces(path),
    getChangedFiles({ fromBranch, cwd: path, branch }),
  ]);
  return getTouchedDependencies({ files, workspaces });
};

exports.getChangedWorkspaces = getChangedWorkspaces;
