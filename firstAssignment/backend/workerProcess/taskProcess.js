const { Worker } = require("bullmq");

const processTask = async (job) => {
    console.log(`Processing task: ${job.data.message}`);
    
};

const worker = new Worker("taskQueue", processTask
    , {
        connection: {
            host: "127.0.0.1",
            port: 6379,
        }
    },);

