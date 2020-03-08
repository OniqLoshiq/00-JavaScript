class Company{
    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department){
        if(!username || !salary || !position || !department){
            throw new Error('Invalid input!');
        }

        if(salary < 0){
            throw new Error(' Invalid input!');
        }

        let employee = {
            username,
            salary,
            position
        }

        let departmentObj = this.departments.find(d => d.department === department);

        if(!departmentObj){
            this.departments.push({department, employees: [employee]});
        } else {
            departmentObj.employees.push(employee);
        }

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment(){
        let departmentsAvgSalary = this.departments.reduce((acc, curr) => {
            let avgSalary = curr.employees.reduce((totalSalary, empl) => totalSalary + empl.salary, 0) / curr.employees.length;
            acc.push({department: curr.department, averageSalary: avgSalary});
            return acc;
        }, []);

        let bestDepartment = departmentsAvgSalary.sort((a, b) => b.averageSalary - a.averageSalary)[0];

        let result = `Best Department is: ${bestDepartment.department}\nAverage salary: ${bestDepartment.averageSalary.toFixed(2)}\n`;

        let department = this.departments.find(d => d.department === bestDepartment.department);

        let employeesPrint = department.employees.sort((a, b) => b.salary - a.salary || a.username.localeCompare(b.username))
        .map(e => `${e.username} ${e.salary} ${e.position}`).join('\n');

        result += employeesPrint;

        return result;
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());


