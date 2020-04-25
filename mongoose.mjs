import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false)
mongoose.set('bufferCommands', false)
let conn = null;

const uri = "mongodb+srv://Sergey:fds744502fds@xart-qd8fc.mongodb.net/school?retryWrites=true&w=majority";

export default  (obj, func, ...args)=>{
    return new Promise( function (resolve, reject) {
        let out = (obj) => {
            console.log('~~~ out ~~~')
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        switch (func) {
            case 'get':
                (async (obj, props,data) => {
                    try {
                        switch (obj[props]) {
                            case '/':
                               await (async (obj, props,data) => {
                                    try {
                                        console.log(`${func}[(${obj['input']})${obj[props]}]`)

                                        if (conn == null) {
                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectTries: 3,
                                                reconnectInterval: 3000,
                                                useNewUrlParser: true
                                            });

                                            try {
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{

                                            try {
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }

                                        const M = conn.model('feed');

                                        const doc = await M.find()
                                            .exec()
                                            .then(news => {

                                                if(news.length === 0){
                                                    let none = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
</channel>
</rss> `

                                                    out(none)
                                                }else{
                                                    out(news)
                                                }
                                            });
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case '/feeds':
                               await (async (obj, props,data) => {
                                    try {
                                        console.log(`${func}[(${obj['input']})${obj[props]}]`)

                                        if (conn == null) {
                                            // conn = await mongoose.createConnection(uri, {
                                                // bufferMaxEntries: 0, // and MongoDB driver buffering
                                                // useNewUrlParser: true
                                            // });

                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectTries: 3,
                                                useUnifiedTopology: true,
                                                reconnectInterval: 3000,
                                                useNewUrlParser: true
                                            });

                                            try {
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{
                                            try {
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }

                                        const M = conn.model('feed');

                                        M.find()
                                            .exec()
                                            .then(news => {
                                                if(news.length === 0){
                                                    let none = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
</channel>
</rss> `


                                                    out(none)
                                                }else{
                                                    out(news)
                                                }
                                            });
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case '/items':
                                (async (obj, props,data) => {
                                    try {
                                        console.log(`${func}[(${obj['input']})${obj[props]}]`)

                                        if (conn == null) {
                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectTries: 3,
                                                reconnectInterval: 3000,
                                                useNewUrlParser: true
                                            });
                                            try {
                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }else{
                                            try {
                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }

                                        const M = conn.model('item');

                                            M.find()
                                            .exec()
                                            .then(news => {
                                                out(news)
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            default:
                                err(`новая функция ${func}`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])
                break
            case 'create':
                (async (obj, props,data) => {
                    try {
                        console.log(`${func}[(${obj['input']})${obj[props]}]`)
                        switch (obj[props]) {
                            case 'channel':
                                (async (obj, props,data) => {
                                    try {
                                        console.log(`${func}[(${obj['input']})${obj[props]}]`)
                                        if (conn == null) {
                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectInterval: 5000,
                                                reconnectTries: 60,
                                                useNewUrlParser: true
                                            });
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                        }else{

                                            try {
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }
                                        }

                                        const M = conn.model('feed');
                                        out(await M.create(obj['data']))

                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'item':

                                (async (obj, props,data) => {
                                    try {
                                        if (conn == null) {
                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectInterval: 5000,
                                                reconnectTries: 60,
                                                useNewUrlParser: true
                                            });
                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));
                                        }else{
                                            try {
                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            } catch (error) {

                                            }

                                        }
                                        const M = conn.model('item');

                                        console.log(M)
                                        out(await M.create(obj['data']))
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])

                                break
                            default:
                                err(`новая функция ${func}`)
                                break
                        }


                        out(obj)
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])

                break
            case 'update':
                (async (obj, props,data) => {
                    try {
                        console.log(`${func}[(${obj['input']})${obj[props]}]`)
                        switch (obj[props]) {
                            case 'feed':
                                (async (obj, props,data) => {
                                    try {
                                        console.log(`${func}[(${obj['input']})${obj[props]}]`)
                                        if (conn == null) {

                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectInterval: 5000,
                                                reconnectTries: 60,
                                                useNewUrlParser: true
                                            });
                                            console.log('~~~~~~~', obj['data'])
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));

                                        }else{

                                            try {
                                                conn.model('feed', new mongoose.Schema({ 'feed': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }
                                        }


                                        const M = conn.model('feed');
                                        console.log('~~~~22~~~', obj['data'])
                                         M.findOneAndUpdate({_id: obj['_id']}, obj['data'])
                                             .exec()
                                             .then((product) => {
                                                 out(product)
                                             })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'item':

                                (async (obj, props,data) => {
                                    try {
                                        console.log(`${obj['input']}[(table)${obj[props]}]`)

                                        if (conn == null) {
                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectInterval: 5000,
                                                reconnectTries: 60,
                                                useNewUrlParser: true
                                            });

                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));

                                        }else{
                                            try {
                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }
                                        }

                                        const M = conn.model('item');

                                        M.findOneAndUpdate({_id: obj['_id']}, obj['data'])
                                            .exec()
                                            .then((product) => {
                                                out(product)
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])

                                break
                            default:
                                err(`новая функция ${func}`)
                                break
                        }


                        out(obj)
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])

                break
            case 'delete':
                (async (obj, props,data) => {
                    try {
                        console.log(`${func}[(${obj['input']})${obj[props]}]`)
                        switch (obj[props]) {
                            case 'feed':
                                (async (obj, props,data) => {
                                    try {
                                        console.log(`${obj['input']}[(table)${obj[props]}]`)



                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])
                                break
                            case 'item':

                                (async (obj, props,data) => {
                                    try {
                                        console.log(`${obj['input']}[(table)${obj[props]}]`)

                                        if (conn == null) {
                                            conn = await mongoose.connect(uri, {
                                                authSource: "admin",
                                                autoReconnect: true,
                                                reconnectTries: 3,
                                                reconnectInterval: 3000,
                                                useNewUrlParser: true
                                            });

                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));

                                        }else{
                                            try {
                                                conn.model('item', new mongoose.Schema({ 'item': Object, 'id': String, 'object': String }));
                                            }catch (e) {

                                            }

                                        }

                                        const M = conn.model('item');

                                        M.deleteOne({ '_id': obj['_id'] })
                                            .exec()
                                            .then(() => {
                                                out({sucsess: 'true'})
                                            })
                                    } catch (e) { err(e) }
                                })(obj, args[0], args[1], args[2], args[3])

                                break
                            default:
                                err(`новая функция ${func}`)
                                break
                        }
                    } catch (e) { err(e) }
                })(obj, args[0], args[1], args[2], args[3])

                break
            default:
                err(`новая функция ${func}`)
                break
        }
    })
}
