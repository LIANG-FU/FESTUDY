const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const request = require('superagent')
require('superagent-charset')(request)
require('superagent-proxy')(request)
//https://www.fabiaoqing.com/bqb/lists
//爬虫小栗子，爬表情包
//测试ip代理池，现可跳过
//superagent+cheerio

const proxylist = require("./proxy.json")
//console.log(proxylist)
function getProxyRadom() { //获取随机ip
    let len = proxylist.length
    let {
        host,
        port
    } = proxylist[(Math.random() * len) | 0]
    console.log(`http://${host}:${port}`)
    //return `http://192.168.2.214:8888`
    return `http://${host}:${port}`
}

async function parsePage(url, pageNum) { //分析详情页
    return new Promise((resolve, reject) => {
        request.get(url)
            .proxy(getProxyRadom())
            .timeout(3000)
            .on('error', function (err) {
                console.error("30ERR", err)
                console.log("errproxy", this._proxyUri)
                this.proxy(getProxyRadom())
            })
            .then(async (res) => {
                let $ = cheerio.load(res.text)
                let title = $("h1.header").first().text() //表情包组名
                title = title.replace(/-\s?\d.*/g, '')
                title = title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
                title = title.trim()
                title = title.slice(0, 10) + (title.slice(11) ? '...' : '')
                //console.log(title)
                let imgs = $(".swiper-slide.swiper-slide-active.bqpp>a")
                //console.log(imgs)
                await Array.apply(null, imgs).reduce(async (pre, next) => {
                    try {
                        await pre
                    } catch (e) {
                        console.error(49, e)
                        return Promise.resolve()
                    }
                    return new Promise(async (resolve, reject) => {
                        let img = $(next).find("img")
                        let name = img.attr('title') //表情包名
                        name = name.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')
                        name = name.trim()
                        name = name.slice(0, 20) + (name.slice(21) ? '...' : '')
                        let imgUrl = img.attr('data-original') //表情包图片地址
                        console.log(pageNum, title, name, imgUrl)
                        try {
                            if (!fs.existsSync('./img')) {
                                fs.mkdir('./img/', (err) => {
                                    if (err) console.error(err)
                                })
                            }
                            if (!fs.existsSync('./img/' + title)) {
                                fs.mkdir('./img/' + title, (err) => {
                                    if (err) console.error(err)
                                })
                            }
                        } catch (e) {
                            console.log(72, err)
                        }

                        let ename = path.extname(imgUrl)
                        request.get(imgUrl).end(async (err, res) => {
                            if (err) console.log(err)
                            try {
                                if (res) fs.writeFile(`./img/${title}/${name}${ename}`, res.body, "binary", function (err) {
                                    if (err) console.error(err)
                                    else {
                                        resolve()
                                    }
                                })
                                resolve()
                            } catch (e) {
                                parsePage(url, pageNum)
                                resolve(e)
                            }

                        })
                    })
                }, Promise.resolve())
                resolve()
            }).catch(err => {
                parsePage(url, pageNum)
                resolve(err)
            })
    })
}

async function getData(){
    try {
        let data = await getPageNum()
    } catch(err){
        getData()
    }
}

async function getPageNum() {
    console.log("开始获取页数")
    return new Promise(async (resolve, reject) => {
        const url = 'https://www.fabiaoqing.com/bqb/lists';
        // axios.get(url, {
        //     proxy: false,
        //     httpsAgent: tunnelProxy,
        // }).then((res) => {
        //     console.log(res.data)
        // }).catch(e => console.log(e))
        request.get(url)
            .proxy(getProxyRadom())
            .timeout(3000)
            .on('error', function (err) {
                console.error("115ERR", err)
                console.log("errproxy", this._proxyUri)
                this.proxy(getProxyRadom())
            })
            .then(res => {
                let html = res.text
                const $ = cheerio.load(html)
                const list = $(".ui.pagination.menu>a.item")
                const last = (list.length - 3) > 0 ? list.length - 3 : list.length - 1
                const num = Number($(list[last]).text().trim())
                console.log("拿到主页数：", num)
                resolve(num)
            }, e => {
                console.log("没拿到主页")
                console.error(129, e)
                // spider() //重启主程序

            })
    })
}
async function spider() {
    // const pageNum = await getPageNum() //提取总页数
    if (!pageNum) return
    const arr = new Array(pageNum).fill(0).map((v, i) => i + 1)
    arr.reduce( //递归promise操作页码
        async (pre, next) => {
            try {
                await pre
            } catch (e) {
                return Promise.resolve()
            }

            return new Promise(async (resolve, reject) => {
                console.log(next)
                let i = next
                let httpurl = `https://www.fabiaoqing.com/bqb/lists/type/hot/page/${i}.html`
                request.get(httpurl)
                    .proxy(getProxyRadom())
                    .on('error', function (err) {
                        console.error("148ERR", err)
                        //console.log("errproxy", this._proxyUri)
                        this.proxy(getProxyRadom())
                    })
                    .then(async (res) => {
                        //console.log(res)
                        const $ = cheerio.load(res.text)
                        const list = $("#bqblist>a.bqba")

                        await Array.apply(null, list).reduce(async (pre, next) => {
                            await pre
                            return new Promise(async (resolve, reject) => {
                                const href = ($(next).attr('href'))
                                parsePage("https://www.fabiaoqing.com/" + href, i).then(() => {
                                    resolve()
                                }, (e) => {
                                    console.error(164, e)
                                    resolve()
                                })

                            })
                        }, Promise.resolve())
                        //console.log(list)
                        resolve()
                    }).catch(e => {
                        console.error(179, e)
                        resolve()
                    })
            })
        }, Promise.resolve())
}
spider()