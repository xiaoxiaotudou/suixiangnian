// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')

cloud.init({
  //env: 'prod-29121c'
  env: 'staging-ef4dd'
})

const database = cloud.database()

exports.main = async (event, context) => {
  const router = new tcbRouter({ event });

  router.router('util', 
     async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
       const util = require('util/util.js')
       ctx.body = util.main(event, context, cloud, database)
    }
  )

  router.router('billReason-findAll',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billReason/findAll.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('billReason-save',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billReason/save.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('billReason-delete',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billReason/delete.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('billReason-edit',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billReason/edit.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('billType-findAll',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billType/findAll.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('billCloseType-findAll',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billCloseType/findAll.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('bill-findAll',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('bill/findAll.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('bill-findById',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('bill/findById.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('bill-delete',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('bill/delete.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  return router.serve()
}