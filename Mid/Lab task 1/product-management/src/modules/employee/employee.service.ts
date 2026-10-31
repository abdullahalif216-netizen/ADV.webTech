import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon2 from "argon2";
import { QueryFailedError, Repository } from "typeorm";
import { Employee } from "@/modules/employee/entities/employee.entity";
import { CreateEmployeeDto } from "@/modules/employee/dto/create-employee.dto";
import { UpdateEmployeeDto } from "@/modules/employee/dto/update-employee.dto";

// PostgreSQL error code for "unique constraint violation"
const PG_UNIQUE_VIOLATION = "23505";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      password: await argon2.hash(createEmployeeDto.password),
    });
    return this.saveOrThrow(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ order: { id: "ASC" } });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);
    const { password, ...rest } = updateEmployeeDto;
    Object.assign(employee, rest);
    if (password) {
      employee.password = await argon2.hash(password);
    }
    return this.saveOrThrow(employee);
  }

  async remove(id: number): Promise<{ message: string }> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
    return { message: `Employee with id ${id} deleted successfully` };
  }

  /** Save, and turn a duplicate-email database error into a clean 409 response. */
  private async saveOrThrow(employee: Employee): Promise<Employee> {
    try {
      return await this.employeeRepository.save(employee);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string })?.code === PG_UNIQUE_VIOLATION
      ) {
        throw new ConflictException("An employee with this email already exists");
      }
      throw error;
    }
  }
}
