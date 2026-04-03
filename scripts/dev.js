const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'npm.cmd' : 'npm';

const processes = [
  {
    name: 'frontend',
    command: npmCommand,
    args: ['run', 'dev'],
    cwd: path.join(rootDir, 'frontend'),
  },
  {
    name: 'backend',
    command: 'node',
    args: ['server.js'],
    cwd: path.join(rootDir, 'backend'),
  },
];

const children = processes.map(({ name, command, args, cwd }) => {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
    }
  });

  child.on('error', (error) => {
    console.error(`Failed to start ${name}:`, error.message);
  });

  return child;
});

const shutdown = () => {
  children.forEach((child) => {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
