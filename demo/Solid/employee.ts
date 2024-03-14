export class Employee {
  private id: string
  private name: string
  private position: string
  private salary: number
}

export class HelperEmployee extends Employee {
  private department: string
}