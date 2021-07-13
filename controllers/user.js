import db from '../db.js';

const user = {

    register: async(params) => {
        let sql = `select * from users where idx=${params.userIdx}`;
        
        return new Promise((resolve, reject) => {
            db.promise().query(sql).then(([rows, fileds]) => {
                return resolve(rows);
            }).catch((err) => {
                return reject(err);
            });
        })
    },


    signup : (param) => { 

    }

}

export default user