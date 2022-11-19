//pm2 config
module.exports = {
    apps: [
        {
            name: "todo",
            script: "./src/index.js",
            instances: "max",
            exec_mode: "cluster",
            watch:false,
            ignore_watch: ["logs"],
            max_memory_restart: "300M",
        }
    ]
};