import { IsString, IsNotEmpty } from 'class-validator';

export class CreateModuleADto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
