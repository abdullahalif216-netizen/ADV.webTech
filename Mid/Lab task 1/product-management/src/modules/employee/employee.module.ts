import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "@/modules/employee/entities/employee.entity";
import { EmployeeService } from "@/modules/employee/employee.service";
import { EmployeeController } from "@/modules/employee/employee.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
