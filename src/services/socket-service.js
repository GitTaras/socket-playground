import io from 'socket.io-client';
import {setStatus, updateTime} from '../store/socket/socket-actions';

class WSController {
  connect(baseURL) {
    this.socket = io(baseURL, { origins: 'localhost:*' });
    return this;
  }

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  listen() {
    this.socket.on('connect', () => {
      console.log('connected', this.socket.id);
      this.dispatch(setStatus('online'));
    });
    this.socket.on('disconnect', () => {
      this.dispatch(setStatus('offline'));
      // this.socket.disconnect(true);
    });
    this.socket.on('update_time', (time) => {
      this.dispatch(updateTime(time));
    });
  }

  getTime() {
    this.socket.emit('get_time');
  }
}

export default WSController;
