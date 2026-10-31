import { PartialType } from "@nestjs/swagger";
import { CreateEmployeeDto } from "@/modules/employee/dto/create-employee.dto";

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
