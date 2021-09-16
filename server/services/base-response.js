/**
 * Date: 15 September 2021
 * Title: base-response.js
 * Author: Fred Marble
 * Description: Creating A base response file for use for API Calls.
 */

class BaseResponse{
  //This aligns all of the received codes to the class variables.
  constructor(httpCode, message, data){
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // The toObject allows us to return the mapped variables.
  toObject(){
    return{
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString
    }
  }
}

module.exports = BaseResponse;
