const cloud = require('wx-server-sdk')
cloud.init({
    traceUser: true,
})
const db = cloud.database();
// const thisCloudFunctionName = 'user_card';
exports.main = async (event, context) => {
    switch (event.action) {
        case 'returnOpenid' : {
            return {openid: cloud.getWXContext().OPENID}
        }
        case 'updateInc': {
            const tableName = event.tableName;
            const whereData = event.whereData;
            const updateField = event.updateField;
            const updateNumber = event.updateNumber;
            let data = {};
            data[updateField] = db.command.inc(updateNumber)
            return db.collection(tableName).where(whereData).update({
                data: data
            })
        }
        case 'update' : {
            const tableName = event.tableName;
            const whereData = event.whereData;
            const updateData = event.updateData;
            return db.collection(tableName).where(whereData).update({
                data: updateData,
            })
        }
        case 'remove' : {
            const tableName = event.tableName;
            const whereData = event.whereData;
            return db.collection(tableName).where(whereData).remove()
        }
        case 'get' : {
            const tableName = event.tableName;
            const whereData = event.whereData;
            return db.collection(tableName).where(whereData).get()
        }

        case 'add' : {
            const tableName = event.tableName;
            const addData = event.addData;
            return db.collection(tableName).add(
                {data: addData}
            )
        }
    }
}