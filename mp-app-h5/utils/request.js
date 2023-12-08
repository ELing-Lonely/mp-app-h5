const BASEURL = "http://192.168.125:8080"

const service = (options = {}) => {
    console.log(options)
    let header = {
        'content-type': 'application/json;charset=UTF-8',
        'Authorization': uni.getStorageSync('token') && uni.getStorageSync('token')
    }

    options.header && Object.assign(header, options.header)

    return new Promise((resolve, reject) => {
        uni.request({
            method: options.method,
            url: BASEURL + options.url,
            data: options.data,
            header: header,
            dataType: 'json',
        }).then(response => {
            const [err, res] = response
            switch (res.statusCode) {
                case 200:
                    switch (res.data.code) {
                        case 200:
                            resolve(res)
                            break;
                        case 500:
                            reject(err)
                            break;
                        case 401:
                            reject(err)
                            break;
                    }
                    break;
                default:
                    uni.showToast({
                        title: "系统繁忙！",
                        icon: 'error'
                    });
                    reject(err);
                    break;
            }
        }).catch(error => {
            reject(error)
        })
    })

}

export default service