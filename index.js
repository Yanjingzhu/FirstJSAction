const cp = require('child_process');

cp.execSync(`cd ${__dirname}; yarn install`);

const core = require('@actions/core');
const github = require('@actions/github');

async function tag() {

    const token = core.getInput("token", { required: true });
    const tagName = core.getInput("tag", { required: true });
    const tagMessage = core.getInput("message", { required: true });
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split("/");

    const oct = new github.GitHub(token);

    const createdTag = await oct.git.createTag({
        owner: repoOwner,
        repo: repoName,
        tag: tagName,
        message: tagMessage,
        object: process.env.GITHUB_SHA,
        type: "commit"
    });

    if (createdTag.status !== 201) {
        core.setFailed(`Could not create tag. Received ${createdTag.status} from API`)
    }

    await oct.git.createRef({
        owner: repoOwner,
        repo: repoName,
        ref: 'refs/tags/' + tagName,
        sha: createdTag.data.sha
    }).then(
        ({ status }) => {
            if (status !== 201) {
                core.setFailed(`Could not create reference. Received ${status} from API`)
            }
        }
    )
}

tag().catch(
    (err) => {
        core.setFailed(err.message)
    }
);
