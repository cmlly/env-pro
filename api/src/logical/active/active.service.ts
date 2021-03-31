import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class ActiveService {
  // 查询活动列表
  async activeList(body: any): Promise<any> {
    const { pageIndex = 1, pageSize = 10  } = body;
    // 分页查询
    const currentIndex = ( pageIndex - 1 ) * pageSize < 0 ? 0 : ( pageIndex - 1 ) * pageSize;
    const sql = `
        SELECT
          *
        FROM  
          active
        ORDER BY
          id
        LIMIT ${currentIndex}, ${pageSize}
     `;
    const activeList: any[] = await sequelize.query(sql,{
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })

    // 总条数
    const countSql = `
        SELECT
          COUNT(*) AS total
        FROM
          active
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
        data: activeList,
        total: count.total,
        pageNo: pageIndex,
        lastPageNo: Math.ceil(count.total / pageSize)
      },
      msg: '查询成功'
    }

  }

  // 新增活动接口
  async addActive(body: any): Promise<any> {
    const { theme, purpose, time, location, people, classify, content } = body;
    const sql = `
      INSERT INTO active
        (theme, purpose, time, location, people, classify, content)
      VALUES
        ('${theme}', '${purpose}', '${time}', '${location}', '${people}', '${classify}','${content}')  
     `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '新增活动成功'
    }
  }

  // 查看活动详情
  async activeDetail(body: any): Promise<any> {
    const { id } = body;
    const sql = `
        SELECT
          *
        FROM
          active
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

  // 编辑活动
  async editActive(body: any): Promise<any> {
    const { id, theme, purpose, time, location, people, classify, content } = body;
    const sql = `
        UPDATE
          active
        SET
          theme = '${theme}',
          purpose = '${purpose}',
          time = '${time}',
          location = '${location}',
          people = '${people}',
          classify = '${classify}',
          content = '${content}'
        WHERE
          id = ${id}
      `;
    // const transaction = await sequelize.transaction()
    await sequelize.query(sql, { logging: false });
    return {
      code: 200,
      msg: '编辑活动成功'
    }
  }

  // 删除活动
  async deleteActive(body: any): Promise<any> {
    const { id } = body;
    const sql = `
        DELETE FROM
         active
        WHERE
          id = ${id}
      `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '删除成功'
    }
  }

  // 活动分类接口
  async activeClassify(): Promise<any> {
    const sql =
      `
        SELECT
          *
        FROM
          active_classify     
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
