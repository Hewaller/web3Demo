var errors = require('./errors');

// workaround to use httpprovider in different envs

// browser
if (typeof window !== 'undefined' && window.XMLHttpRequest) {
  XMLHttpRequest = window.XMLHttpRequest; // jshint ignore: line
  // node
} else {
  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // jshint ignore: line
}

var XHR2 = require('xhr2-cookies').XMLHttpRequest; // jshint ignore: line

var HttpProvider = function(host, timeout, user, password, headers) {
  this.host = host || 'http://localhost:8545';
  this.timeout = timeout || 0;
  this.user = user;
  this.password = password;
  this.headers = headers;
};

HttpProvider.prototype.prepareRequest = function(async) {
  var request;

  if (async) {
    request = new XHR2();
    request.timeout = this.timeout;
  } else {
    request = new XMLHttpRequest();
  }
  request.withCredentials = true;

  request.open('POST', this.host, async);
  if (this.user && this.password) {
    var auth = 'Basic ' + new Buffer(this.user + ':' + this.password).toString('base64');
    request.setRequestHeader('Authorization', auth);
  }
  request.setRequestHeader('Content-Type', 'application/json');
  if (this.headers) {
    this.headers.forEach(function(header) {
      request.setRequestHeader(header.name, header.value);
    });
  }
  return request;
};

HttpProvider.prototype.send = function(payload) {
  var request = this.prepareRequest(false);
  // debugger;
  try {
    request.send(JSON.stringify(payload));
  } catch (error) {
    throw errors.InvalidConnection(this.host);
  }

  var result = request.responseText;

  try {
    result = JSON.parse(result);
  } catch (e) {
    throw errors.InvalidResponse(request.responseText);
  }

  return result;
};

HttpProvider.prototype.sendAsync = function(payload, callback) {
  var request = this.prepareRequest(true);

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.timeout !== 1) {
      var result = request.responseText;
      var error = null;

      try {
        result = JSON.parse(result);
      } catch (e) {
        error = errors.InvalidResponse(request.responseText);
      }

      callback(error, result);
    }
  };

  request.ontimeout = function() {
    callback(errors.ConnectionTimeout(this.timeout));
  };

  try {
    request.send(JSON.stringify(payload));
  } catch (error) {
    callback(errors.InvalidConnection(this.host));
  }
  return request;
};

HttpProvider.prototype.isConnected = function() {
  try {
    this.send({
      id: 9999999999,
      jsonrpc: '2.0',
      method: 'net_listening',
      params: [],
    });
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = HttpProvider;
