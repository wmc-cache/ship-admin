import mqtt from 'mqtt'

const connection = {
  host: 'broker.emqx.io',
  port: 8083,
  endpoint: '/mqtt',
  clean: true, // 保留会话
  connectTimeout: 4000, // 超时时间
  reconnectPeriod: 4000, // 重连时间间隔
  // 认证信息
  clientId: 'mqttjs_3be2c321',
  username: 'emqx_test',
  password: 'emqx_test',
}

const client;// mqtt对象

// 创建连接
export function createConnection() {
  const { host, port, endpoint, ...options } = this.connection
  //console.log('options:', options)
  const connectUrl = `ws://${host}:${port}${endpoint}`
  try {
    this.client = mqtt.connect(connectUrl, options)
    console.log('client', this.client)
  } catch (error) {
    console.log('mqtt.connect error', error)
  }
  this.client.on('connect', () => {
    console.log('Connection succeeded!')
  })
  this.client.on('error', error => {
    console.log('Connection failed', error)
  })
  this.client.on('message', (topic, message) => {
    //this.receiveNews = this.receiveNews.concat(message)
    console.log(`Received message ${message} from topic ${topic}`)
  })
}


// 订阅主题
export function doSubscribe() {
  const { topic, qos } = this.subscription
  this.client.subscribe(topic, { qos }, (error, res) => {
    if (error) {
      console.log('Subscribe to topics error', error)
      return
    }
    this.subscribeSuccess = true
    console.log('Subscribe to topics res', res)
  })
}
// 取消订阅
export function doUnSubscribe() {
  const { topic } = this.subscription
  this.client.unsubscribe(topic, error => {
    if (error) {
      console.log('Unsubscribe error', error)
    }
  })
}
// 发送消息
export function doPublish() {
  const { topic, qos, payload } = this.publish
  this.client.publish(topic, payload, qos, error => {
    if (error) {
      console.log('Publish error', error)
    }
  })
}


// 断开连接
export function destroyConnection() {
  if (this.client.connected) {
    try {
      this.client.end()
      this.client = {
        connected: false,
      }
      console.log('Successfully disconnected!')
    } catch (error) {
      console.log('Disconnect failed', error.toString())
    }
  }
}
