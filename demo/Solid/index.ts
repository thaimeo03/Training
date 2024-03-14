// Interface for Employee
interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

interface EmployeeInfo extends Employee {
  calculateSalary(): number;
}

// Interface for Employee Repository
interface EmployeeRepository {
  addEmployee(employee: Employee): void;
  updateEmployee(employee: Employee): void;
  deleteEmployee(id: number): void;
  findEmployeeById(id: number): Employee | undefined;
}

// Concrete implementation of EmployeeRepository
class InMemoryEmployeeRepository implements EmployeeRepository {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
    console.log(`Employee ${employee.name} added.`);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      console.log(`Employee ${employee.name} updated.`);
    } else {
      console.log(`Employee with ID ${employee.id} not found.`);
    }
  }

  deleteEmployee(id: number): void {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      const deletedEmployee = this.employees.splice(index, 1)[0];
      console.log(`Employee ${deletedEmployee.name} deleted.`);
    } else {
      console.log(`Employee with ID ${id} not found.`);
    }
  }

  findEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }
}

// Employee Manager class
class EmployeeManager {
  constructor(private repository: EmployeeRepository) {}

  addEmployee(employee: Employee): void {
    this.repository.addEmployee(employee);
  }

  updateEmployee(employee: Employee): void {
    this.repository.updateEmployee(employee);
  }

  deleteEmployee(id: number): void {
    this.repository.deleteEmployee(id);
  }
}

// Concrete implementation of Employee interface
class PermanentEmployee implements Employee {
  constructor(
    public id: number,
    public name: string,
    public position: string,
    public salary: number
  ) {}
}

// Concrete implementation of Employee interface
class ContractEmployee implements EmployeeInfo {
  constructor(
    public id: number,
    public name: string,
    public position: string,
    public salary: number
  ) {}

  calculateSalary(): number {
    return this.salary;
  }
}

// Usage
const repository = new InMemoryEmployeeRepository();
const employeeManager = new EmployeeManager(repository);

const permanentEmployee = new PermanentEmployee(1, 'John', 'Developer', 50000);
const contractEmployee = new ContractEmployee(2, 'Alice', 'Designer', 40000);

contractEmployee.calculateSalary();

employeeManager.addEmployee(permanentEmployee);
employeeManager.addEmployee(contractEmployee);
employeeManager.updateEmployee({ id: 1, name: 'John Doe', position: 'Senior Developer', salary: 60000 });
employeeManager.deleteEmployee(2);
