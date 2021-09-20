/**
 * Date: 16 September 2021
 * Title: error-response.js
 * Author: Fred Marble
 * Description: Creating a error response file for use for API Calls.
 */

 class ErrorResponse{
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

module.exports = ErrorResponse;
