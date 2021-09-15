/**
 * Date: 15 September 2021
 * Title: base-response.js
 * Author: Fred Marble
 * Description: Creating A base response file for use for API Calls.
 */

class BaseResponse{
  //This aligns all of the received codes to the class variables.
  constructor(code, msg, data){
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  // The toObject allows us to return the mapped variables.
  toObject(){
    return{
      'code': this.code,
      'msg': this.msg,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString
    }
  }
}

module.exports = BaseResponse;
