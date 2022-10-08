import Vue from 'vue'

export function cloudSearch(keywords) {
    return new Promise((resolve, reject) => {
        Vue.axios({
            method: 'GET',
            url: `/cloudsearch?keywords=${keywords}&timestamp=${Date.now()}`,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}



export function topPlaylist() {
    return new Promise((resolve, reject) => {
        Vue.axios({
            method: 'GET',
            url: `/top/playlist?limit=10&timestamp=${Date.now()}`,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}


export function personalized() {
    return new Promise((resolve, reject) => {
        Vue.axios({
            method: 'GET',
            url: `/personalized?limit=2&timestamp=${Date.now()}`,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function detailList(id) {
    return new Promise((resolve, reject) => {
        Vue.axios({
            method: 'GET',
            url: `/playlist/detail?id=${id}&timestamp=${Date.now()}`,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function songdetail(id) {
    return new Promise((resolve, reject) => {
        Vue.axios({
            method: 'GET',
            url: `/song/detail?ids=${id}&timestamp=${Date.now()}`,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function songUrldetail(id) {
    return new Promise((resolve, reject) => {
        Vue.axios({
            method: 'GET',
            url: `/song/url?id=${id}&timestamp=${Date.now()}`,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 获取歌手全部歌曲

export function artistSongs() {
    return new Promise((resolve, reject) => {
        Vue.axios({
            method: 'GET',
            url: `/artist/top/song?id=6452&limit=10&timestamp=${Date.now()}`,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}