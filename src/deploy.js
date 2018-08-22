const {exec} = require('child_process');
const {deployPath, ip, username} = require('../secrets.json');
const copy = `scp -r * ${username}@${ip}:${deployPath}`;
exec(copy, {cwd: 'build'}, (err, stdout, stderr) => {
  if (err) throw new Error(err);
  if (stdout) console.log('stdout:', typeof stdout);
  if (stderr) console.log('stderr:', typeof stderr);
});
