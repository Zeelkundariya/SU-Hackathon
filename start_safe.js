const { spawn } = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

function start(dir, cmd, args, env = {}) {
    console.log(`Starting ${cmd} in ${dir}...`);
    const p = spawn(cmd, args, {
        cwd: dir,
        env: { ...process.env, ...env },
        shell: true,
        stdio: 'inherit'
    });
    p.on('error', (err) => console.error(`Failed to start ${cmd} in ${dir}:`, err));
}

// Start backend
start(backendDir, 'node', ['server.js'], { PORT: 3000 });

// Start frontend
start(frontendDir, 'npx', ['react-scripts', 'start'], { PORT: 3001, BROWSER: 'none' });
