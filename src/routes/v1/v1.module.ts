import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';
import { ModuleAModule } from './moduleA/moduleA.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [{ path: '/moduleA', module: ModuleAModule }],
  },
];

@Module({
  imports: [RouterModule.register(routes), ModuleAModule],
})
export default class V1Module {}
