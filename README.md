# alexaSkillTests
Careful when zipping this up to upload to aws lambda, if you let npm install too many packages or pull in the aws sdk then it will bloat and you wont be able to edit the code inline. As is, if you zip the modules, index.js (and other custom js), package.json, and the right appId.js then you should be able to run the skill and edit inline via aws lambda.

*Regarding zipping to aws lambda*, make sure that any changes to the node_module dir are added to the .gitignore. When you're ready to upload to aws lambda, delete your node_module dir, git stash the change, and only the modules you'll need to upload will be in the node_module dir. Zip this node_modules directory with any extra code from the project to the aws lambda service, you should be able to still edit inline. You can npm install on your local machine to reinstall all the modules.

*Regarding appId.js*, add an appId.js file in the root folder then replace the **** with your skill app id. format below.

const APP_ID = '****';
module.exports = {
	APP_ID: APP_ID
};

ChangeNotes
	
- added skill.json, this is the skill definition file used to define the interaction model for the skill
- tryin out gulp minify and or webpack for lambdas
- with the gitignore asis you should be able to npm install all packages locally and commit to repo without affecting the node_modules, see above regarding setting up node_modules for zip to aws lambda
