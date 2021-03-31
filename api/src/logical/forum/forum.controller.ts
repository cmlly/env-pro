import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Post('create')
  async addForum(@Request() req: any) {
    return await this.forumService.addForum(req)
  }

  @Post('list')
  async forumList(@Request() req: any) {
    return await this.forumService.forumList(req)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('personalList')
  async forumPersonalList(@Request() req: any) {
    return await this.forumService.forumPersonalList(req)
  }

  @Post('edit')
  async editForum(@Body() body: any) {
    return await this.forumService.editForum(body)
  }

  @Post('detail')
  async forumDetail(@Body() body: any) {
    return await this.forumService.forumDetail(body)
  }

  @Post('delete')
  async deleteForum(@Body() body: any) {
    return await this.forumService.deleteForum(body)
  }

  @Post('classify')
  async getClassify() {
    return await this.forumService.forumClassify()
  }
}
