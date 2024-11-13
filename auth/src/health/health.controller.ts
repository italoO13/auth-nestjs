import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class HealthController {
  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Application is working successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean' },
      },
    },
  })
  checkHealth(): Record<string, boolean> {
    return {
      status: true,
    };
  }
}
