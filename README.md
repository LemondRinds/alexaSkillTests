# alexaSkillTests
Careful when zipping this up to upload to aws lambda, if you let npm install too many packages or pull in the aws sdk then it will bloat and you wont be able to edit the code inline. As is, if you zip the modules, index.js, package.json, and the right appId.js then you should be able to run the skill and edit inline.
