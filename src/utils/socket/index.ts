import { io, Socket } from 'socket.io-client';

// 定义连接参数类型
interface SocketParams {
  [key: string]: any;
}

// 定义事件回调的类型
interface EventListener {
  callback: (data: any, params: SocketParams) => void;
  params: SocketParams;
}

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 3; // 最大重连次数
  private reconnectDelay: number = 1000; // 每次重连的延迟，单位毫秒
  private eventCallbacks: Map<string, EventListener[]> = new Map(); // 使用 Map 管理多个相同事件名的回调和参数

  constructor() {}

  // 初始化 Socket.IO 连接
  public connect({url}: SocketParams = {}): Socket {
    this.socket = io(url, {
      transports: ['websocket'],
      reconnection: true, // 启用重连
      reconnectionAttempts: this.maxReconnectAttempts, // 设置最大重连次数
      reconnectionDelay: this.reconnectDelay, // 设置重连的延迟
    });

    // 监听连接成功事件
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.reconnectAttempts = 0;  // 重置重连次数
      this.onReconnect(); // 重新连接时恢复之前的参数和事件
    });

    // 监听连接断开事件
    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      this.reconnectAttempts++;
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.log('Max reconnect attempts reached');
      }
    });

    // 监听连接失败
    this.socket.on('connect_error', (err: Error) => {
      console.error('Connection failed:', err.message);
    });

    return this.socket;
  }

  // 重新连接时恢复之前的参数和事件绑定
  private onReconnect(): void {
    // 恢复所有保存的事件及其回调和参数
    for (const [event, listeners] of this.eventCallbacks.entries()) {
      for (const listener of listeners) {
        this.on(event, listener.params);
      }
    }
  }

  // 发送消息到服务器
  public emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    // 如果事件已存在，则追加新的回调和参数
    if (!this.eventCallbacks.has(event)) {
        this.eventCallbacks.set(event, []);
    }

    // 保存回调和参数
    this.eventCallbacks.get(event)?.push({data });
    } else {
      console.error('Socket not connected');
    }
  }

  // 接收服务器消息，并携带参数
  public on(event: string, callback: (data: any) => void,): void {
    if (this.socket) {
      // 监听该事件并在事件触发时调用回调函数
      this.socket.on(event, (data: any) => {
        callback(data);  // 将事件数据和参数一起传递给回调
      });
    } else {
      console.error('Socket not connected');
    }
  }

  // 断开连接
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketService;
