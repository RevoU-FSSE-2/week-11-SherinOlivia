import { DBLocal } from "../config/dbConnection"


export const errorHandling = function (data: any, error: any) {
    if (error) {
        return {
            success: false,
            error: error
        }
    }
    return {
        success: true,
        data: data
    }
}

export const query = (query: string, values: any) => {
    return new Promise((resolve, reject) => {
        DBLocal.query(query, values, (err, result, fields) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}