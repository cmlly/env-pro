import { Body, Controller, Post } from '@nestjs/common';
import { ActiveService } from './active.service';

@Controller('active')
export class ActiveController {
  constructor(private activeService: ActiveService) {}

  @Post('create')
  async addActive(@Body() body: any) {
    return await this.activeService.addActive(body)
  }

  @Post('list')
  async activeList(@Body() body: any) {
    return await this.activeService.activeList(body)
  }

  @Post('edit')
  async editActive(@Body() body: any) {
    return await this.activeService.editActive(body)
  }

  @Post('detail')
  async activeDetail(@Body() body: any) {
    return await this.activeService.activeDetail(body)
  }

  @Post('delete')
  async deleteActive(@Body() body: any) {
    return await this.activeService.deleteActive(body)
  }

  @Post('classify')
  async getClassify() {
    return await this.activeService.activeClassify()
  }
}
