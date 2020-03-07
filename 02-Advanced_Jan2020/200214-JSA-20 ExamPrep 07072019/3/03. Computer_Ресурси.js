class Computer {
    ramUsage = 0;
    cpuUsage = 0;

    constructor(ramMemory, cpuGHz, hddMemory){
        this.ramMemory = +ramMemory;
        this.cpuGHz = +cpuGHz;
        this.hddMemory = +hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
    }

    installAProgram(name, requiredSpace){
        if(this.hddMemory < requiredSpace){
            throw new Error('There is not enough space on the hard drive');
        }

        let program = {name, requiredSpace};
        this.installedPrograms.push(program);
        this.hddMemory -= requiredSpace;

        return program;
    }

    uninstallAProgram(name){
        let programIndex = this.installedPrograms.findIndex(p => p.name === name);

        if(programIndex < 0){
            throw new Error('Control panel is not responding');
        }

        this.hddMemory += this.installedPrograms[programIndex].requiredSpace;
        this.installedPrograms.splice(programIndex, 1);

        return this.installedPrograms;
    }

    openAProgram(name){
        let program = this.installedPrograms.find(p => p.name === name);

        if(!program){
            throw new Error(`The ${name} is not recognized`);
        }

        if(this.taskManager.length > 0 && this.taskManager.some(p => p.name === name)){
            throw new Error(`The ${name} is already open`);
        }

        let neededRamPercent = (program.requiredSpace / this.ramMemory) * 1.5;
        let neededCpuPercent = (program.requiredSpace / this.cpuGHz) / 500 * 1.5;

        if((this.ramUsage + neededRamPercent) >= 100){
            throw new Error(`${name} caused out of memory exception`);
        }

        if((this.cpuUsage + neededCpuPercent) >= 100){
            throw new Error(`${name} caused out of cpu exception`);
        }

        this.cpuUsage += neededCpuPercent; 
        this.ramUsage += neededRamPercent;

        let taskObject = {name, ramUsage: neededRamPercent, cpuUsage: neededCpuPercent};
        this.taskManager.push(taskObject);

        return taskObject;
    }

    taskManagerView(){
        if(this.taskManager.length === 0){
            return 'All running smooth so far';
        }

        let result = this.taskManager
        .map(p => `Name - ${p.name} | Usage - CPU: ${p.cpuUsage.toFixed(0)}%, RAM: ${p.ramUsage.toFixed(0)}%`).join('\n');

        return result;
    }
}