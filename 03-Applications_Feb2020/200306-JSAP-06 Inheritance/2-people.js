function solve() {
    class Employee {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = []; 
            this._taskCounter = 0;
        }

        work() {
            if (this._taskCounter === this.tasks.length) {
                this._taskCounter = 0;
            }

            let result = this.tasks[this._taskCounter];
            this._taskCounter++;
            console.log(result);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }

        getSalary(){
            return this.salary;
        }
    }

    class Junior extends Employee{
        constructor(name, age){
            super(name,age);
            this.tasks.push(`${this.name} is working on a simple task.`);
        }
    }

    class Senior extends Employee{
        constructor(name, age){
            super(name,age);
            this.tasks.push(`${this.name} is working on a complicated task.`);
            this.tasks.push(`${this.name} is taking time off work.`);
            this.tasks.push(`${this.name} is supervising junior workers.`);
        }
    }

    class Manager extends Employee{
        constructor(name, age){
            super(name,age);
            this.dividend = 0;
            this.tasks.push(`${this.name} scheduled a meeting.`);
            this.tasks.push(`${this.name} is preparing a quarterly report.`);
        }

        getSalary(){
            return this.salary + this.dividend;
        }
    }

    return {Employee, Junior, Senior, Manager};
}