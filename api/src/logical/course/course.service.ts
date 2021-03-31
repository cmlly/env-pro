import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class CourseService {

  // 查询课程分类
  async courseClassify(): Promise<any> {
    const sql = `SELECT * FROM course_classify`;
    const classify = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })
    return {
      code: 200,
      result: { classify },
      msg: '查询成功'
    }
  }

  // 新增课程
  async createCourse(body: any): Promise<any> {
    const { title, classify, createBy, cover, content, learnNum, description } = body;
    console.log(content)
    const sql = `
      INSERT INTO course
          (title, classify, create_by, cover, content, learn_num, description )
      VALUES
          ('${title}', '${classify}', '${createBy}', '${cover}', '${content}', '${learnNum}', '${description}')
    `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '新增课程成功'
    }
  }

  // 课程列表
  async courseList(body: any): Promise<any> {
    const { pageIndex = 1, pageSize= 10, classify } = body;
    const currentIndex = ( pageIndex - 1 ) * pageSize < 0 ? 0 : ( pageIndex - 1 ) * pageSize;
    let sql = ''
    if ( classify ) {
      sql = `
        SELECT
          *
        FROM
          course
        WHERE
          classify = '${classify}'
        LIMIT ${currentIndex}, ${pageSize}
    `;
    } else {
       sql = `
        SELECT
          *
        FROM
          course
        LIMIT ${currentIndex}, ${pageSize}
    `;
    }
    const list = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })
    // 总条数
    const countSql = `
        SELECT
          COUNT(*) AS total
        FROM
          course
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
        data: list,
        total: count.total,
        pageNo: pageIndex,
        lastPageNo: Math.ceil(count.total / pageSize)
      },
      msg: '查询成功'
    }
  }

  // 获取课程详情
  async courseDetail(body: any): Promise<any> {
    const { id } = body
    const sql = `
        SELECT 
          *
        FROM
          course
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

  //编辑课程
  async editCourse(body: any): Promise<any> {
    const { id, title, classify, createBy, cover, content, learnNum, description } = body;
    const sql = `
        UPDATE
          course
        SET
          title = '${title}',
          classify = '${classify}',
          create_by = '${createBy}',
          cover = '${cover}',
          content = '${content}',
          learn_num = '${learnNum}',
          description = '${description}'
        WHERE
          id = ${id}
    `;
    await sequelize.query(sql, { logging: false });
    return {
      code: 200,
      msg: '编辑成功'
    }
  }

  // 删除课程
  async deleteCourse(body: any): Promise<any> {
    const { id } = body;
    const sql = `
        DELETE FROM
          course
        WHERE
          id = ${id}
      `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '删除成功'
    }
  }

  // 用户选择课程
  async chooseCourse(body: any): Promise<any> {
    const { username } =  body.user;
    const { cid, courseTitle, author, classify  } = body.body;
    const hasChose = await this.hasChose({ username, cid })
    if(hasChose) {
      return {
        code: 200,
        msg: '已经选过这个课程，直接进入学习'
      }
    }else {
      const sql = `
        INSERT INTO user_course
          (uid, cid, course_title, author, classify)
        VALUES
          ('${username}', ${cid}, '${courseTitle}', '${author}', '${classify}')
    `;
      await sequelize.query(sql, { logging: false })
      return {
        code: 200,
        msg: '选课成功'
      }
    }
  }

  // 判断用户是否已经选择某个课程
  async hasChose(body:any): Promise<any> {
    const { username, cid } =  body;
    const sql = `
      SELECT
        *
      FROM
        user_course
      WHERE
        ( uid = '${username}' AND cid = ${cid} )
    `;
    try {
      return (await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: true
      })
      )[0]
    }catch (e) {
      return void 0;
    }
  }

  // 获取用户已经选择的课程
  async choseCourseList(body: any): Promise<any> {
    const { username } = body
    const sql =`
      SELECT
        *
      FROM
        user_course
      WHERE
        uid = '${username}'
    `;
    const list = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    });
    return {
      code: 200,
      result: {
        data: list
      },
      msg: '查询成功'
    }
  }
}
