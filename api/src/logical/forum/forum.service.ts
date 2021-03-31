import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class ForumService {
  // 查询帖子列表
  async forumList(req: any): Promise<any> {
    const { pageIndex = 1, pageSize = 10, classify } = req.body;
    // 分页查询
    const currentIndex = ( pageIndex - 1 ) * pageSize < 0 ? 0 : ( pageIndex - 1 ) * pageSize;
    let sql = ''
    if ( classify ) {
      sql = `
        SELECT
          *
        FROM
          forum
        WHERE
          classify = '${classify}'
        LIMIT ${currentIndex}, ${pageSize}
    `;
    } else {
      sql = `
        SELECT
          *
        FROM
          forum
        LIMIT ${currentIndex}, ${pageSize}
    `;
    }
    const forumList: any[] = await sequelize.query(sql,{
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })

    // 总条数
    const countSql = `
        SELECT
          COUNT(*) AS total
        FROM
          forum
      `
    const count: any = (
      await sequelize.query(countSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false
      })
    )[0]

    return {
      code: 200,
      result: {
        data: forumList,
        total: count.total,
        pageNo: pageIndex,
        lastPageNo: Math.ceil(count.total / pageSize)
      },
      msg: '查询成功'
    }

  }

  //查询某个人拥有的帖子列表
  async forumPersonalList(req: any): Promise<any> {
    const { username } = req.user
    const { pageIndex = 1, pageSize = 10 } = req.body;
    // 分页查询
    const currentIndex = ( pageIndex - 1 ) * pageSize < 0 ? 0 : ( pageIndex - 1 ) * pageSize;
    let sql = ''
      sql = `
        SELECT
          *
        FROM
          forum
        WHERE
          username = '${username}'
        LIMIT ${currentIndex}, ${pageSize}
    `;
    const forumList: any[] = await sequelize.query(sql,{
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })

    // 总条数
    const countSql = `
        SELECT
          COUNT(*) AS total
        FROM
          forum
      `
    const count: any = (
      await sequelize.query(countSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false
      })
    )[0]

    return {
      code: 200,
      result: {
        data: forumList,
        total: count.total,
        pageNo: pageIndex,
        lastPageNo: Math.ceil(count.total / pageSize)
      },
      msg: '查询成功'
    }

  }

  // 新增帖子接口
  async addForum(req: any): Promise<any> {
    const { username } = req.user
    const { title, description, classify, content, createBy } = req.body;
    const sql = `
      INSERT INTO forum
        (title, description, classify, content, create_by, username)
      VALUES
        ('${title}', '${description}', '${classify}', '${content}', '${createBy}', '${username}')  
     `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '新增帖子成功'
    }
  }

  // 查看帖子详情
  async forumDetail(body: any): Promise<any> {
    const { id } = body;
    const sql = `
        SELECT
          *
        FROM
          forum
        WHERE
          id = ${id}
      `;
    const detail = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    });
    return {
      code: 200,
      result: detail[0],
      msg: '查询成功'
    }
  }

  // 编辑帖子
  async editForum(body: any): Promise<any> {
    const { id, title, description, classify, content, createBy } = body;
    const sql = `
        UPDATE
          forum
        SET
          title = '${title}',
          description = '${description}',
          classify = '${classify}',
          create_by = '${createBy}',
          content = '${content}'
        WHERE
          id = ${id}
      `;
    // const transaction = await sequelize.transaction()
    await sequelize.query(sql, { logging: false });
    return {
      code: 200,
      msg: '编辑帖子成功'
    }
  }

  // 删除帖子
  async deleteForum(body: any): Promise<any> {
    const { id } = body;
    const sql = `
        DELETE FROM
         forum
        WHERE
          id = ${id}
      `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '删除成功'
    }
  }

  // 帖子分类接口
  async forumClassify(): Promise<any> {
    const sql =
      `
        SELECT
          name
        FROM
          forum_classify     
      `;
    const classify = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })
    return {
      code: 200,
      result: {
        classify
      },
      msg: '查询成功'
    }
  }
}
