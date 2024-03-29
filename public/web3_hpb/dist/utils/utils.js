var BigNumber = require('bignumber.js');
var sha3 = require('./sha3.js');
var utf8 = require('utf8');

var unitMap = {
  nohpber: '0',
  wei: '1',
  kwei: '1000',
  Kwei: '1000',
  babbage: '1000',
  femtohpber: '1000',
  mwei: '1000000',
  Mwei: '1000000',
  lovelace: '1000000',
  picohpber: '1000000',
  gwei: '1000000000',
  Gwei: '1000000000',
  shannon: '1000000000',
  nanohpber: '1000000000',
  nano: '1000000000',
  szabo: '1000000000000',
  microhpber: '1000000000000',
  micro: '1000000000000',
  finney: '1000000000000000',
  millihpber: '1000000000000000',
  milli: '1000000000000000',
  hpber: '1000000000000000000',
  khpber: '1000000000000000000000',
  grand: '1000000000000000000000',
  mhpber: '1000000000000000000000000',
  ghpber: '1000000000000000000000000000',
  thpber: '1000000000000000000000000000000',
};

var padLeft = function(string, chars, sign) {
  return new Array(chars - string.length + 1).join(sign ? sign : '0') + string;
};

var padRight = function(string, chars, sign) {
  return string + new Array(chars - string.length + 1).join(sign ? sign : '0');
};

var toUtf8 = function(hex) {
  // Find termination
  var str = '';
  var i = 0,
    l = hex.length;
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    if (code === 0) break;
    str += String.fromCharCode(code);
  }

  return utf8.decode(str);
};

var toAscii = function(hex) {
  // Find termination
  var str = '';
  var i = 0,
    l = hex.length;
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(code);
  }

  return str;
};

var fromUtf8 = function(str, allowZero) {
  str = utf8.encode(str);
  var hex = '';
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code === 0) {
      if (allowZero) {
        hex += '00';
      } else {
        break;
      }
    } else {
      var n = code.toString(16);
      hex += n.length < 2 ? '0' + n : n;
    }
  }

  return '0x' + hex;
};

var fromAscii = function(str, num) {
  var hex = '';
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    var n = code.toString(16);
    hex += n.length < 2 ? '0' + n : n;
  }

  return '0x' + hex.padEnd(num, '0');
};

var transformToFullName = function(json) {
  if (json.name.indexOf('(') !== -1) {
    return json.name;
  }

  var typeName = json.inputs
    .map(function(i) {
      return i.type;
    })
    .join();
  return json.name + '(' + typeName + ')';
};

var extractDisplayName = function(name) {
  var stBracket = name.indexOf('(');
  var endBracket = name.indexOf(')');
  return stBracket !== -1 && endBracket !== -1 ? name.substr(0, stBracket) : name;
};

var extractTypeName = function(name) {
  var stBracket = name.indexOf('(');
  var endBracket = name.indexOf(')');
  return stBracket !== -1 && endBracket !== -1
    ? name.substr(stBracket + 1, endBracket - stBracket - 1).replace(' ', '')
    : '';
};

var toDecimal = function(value) {
  return toBigNumber(value).toNumber();
};

var fromDecimal = function(value) {
  var number = toBigNumber(value);
  var result = number.toString(16);

  return number.lessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
};

var toHex = function(val) {
  if (isBoolean(val)) return fromDecimal(+val);

  if (isBigNumber(val)) return fromDecimal(val);

  if (typeof val === 'object') return fromUtf8(JSON.stringify(val));

  // if its a negative number, pass it through fromDecimal
  if (isString(val)) {
    if (val.indexOf('-0x') === 0) return fromDecimal(val);
    else if (val.indexOf('0x') === 0) return val;
    else if (!isFinite(val)) return fromUtf8(val, 1);
  }

  return fromDecimal(val);
};

var getValueOfUnit = function(unit) {
  unit = unit ? unit.toLowerCase() : 'hpber';
  var unitValue = unitMap[unit];
  if (unitValue === undefined) {
    throw new Error(
      "This unit doesn't exists, please use the one of the following units" +
        JSON.stringify(unitMap, null, 2),
    );
  }
  return new BigNumber(unitValue, 10);
};

var fromWei = function(number, unit) {
  var returnValue = toBigNumber(number).dividedBy(getValueOfUnit(unit));

  return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

var toWei = function(number, unit) {
  var returnValue = toBigNumber(number).times(getValueOfUnit(unit));

  return isBigNumber(number) ? returnValue : returnValue.toString(10);
};

var toBigNumber = function(number) {
  number = number || 0;
  if (isBigNumber(number)) return number;

  if (isString(number) && (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
    return new BigNumber(number.replace('0x', ''), 16);
  }

  return new BigNumber(number.toString(10), 10);
};

var toTwosComplement = function(number) {
  alert(number);
  var bigNumber = toBigNumber(number).round();
  if (bigNumber.lessThan(0)) {
    return new BigNumber('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)
      .plus(bigNumber)
      .plus(1);
  }
  return bigNumber;
};

var isStrictAddress = function(address) {
  return /^0x[0-9a-f]{40}$/i.test(address);
};

var isAddress = function(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    return isChecksumAddress(address);
  }
};

var isChecksumAddress = function(address) {
  // Check each case
  address = address.replace('0x', '');
  var addressHash = sha3(address.toLowerCase());

  for (var i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
};

var toChecksumAddress = function(address) {
  if (typeof address === 'undefined') return '';

  address = address.toLowerCase().replace('0x', '');
  var addressHash = sha3(address);
  var checksumAddress = '0x';

  for (var i = 0; i < address.length; i++) {
    // If ith character is 9 to f then make it uppercase
    if (parseInt(addressHash[i], 16) > 7) {
      checksumAddress += address[i].toUpperCase();
    } else {
      checksumAddress += address[i];
    }
  }
  return checksumAddress;
};

var toAddress = function(address) {
  if (isStrictAddress(address)) {
    return address;
  }

  if (/^[0-9a-f]{40}$/.test(address)) {
    return '0x' + address;
  }

  return '0x' + padLeft(toHex(address).substr(2), 40);
};

var isBigNumber = function(object) {
  return (
    object &&
    (object instanceof BigNumber || (object.constructor && object.constructor.name === 'BigNumber'))
  );
};

var isString = function(object) {
  return (
    typeof object === 'string' ||
    (object && object.constructor && object.constructor.name === 'String')
  );
};

var isFunction = function(object) {
  return typeof object === 'function';
};

var isObject = function(object) {
  return object !== null && !Array.isArray(object) && typeof object === 'object';
};

var isBoolean = function(object) {
  return typeof object === 'boolean';
};

var isArray = function(object) {
  return Array.isArray(object);
};

var isJson = function(str) {
  try {
    return !!JSON.parse(str);
  } catch (e) {
    return false;
  }
};

var isBloom = function(bloom) {
  if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
    return true;
  }
  return false;
};

var isTopic = function(topic) {
  if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
    return false;
  } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
    return true;
  }
  return false;
};

module.exports = {
  padLeft: padLeft,
  padRight: padRight,
  toHex: toHex,
  toDecimal: toDecimal,
  fromDecimal: fromDecimal,
  toUtf8: toUtf8,
  toAscii: toAscii,
  fromUtf8: fromUtf8,
  fromAscii: fromAscii,
  transformToFullName: transformToFullName,
  extractDisplayName: extractDisplayName,
  extractTypeName: extractTypeName,
  toWei: toWei,
  fromWei: fromWei,
  toBigNumber: toBigNumber,
  toTwosComplement: toTwosComplement,
  toAddress: toAddress,
  isBigNumber: isBigNumber,
  isStrictAddress: isStrictAddress,
  isAddress: isAddress,
  isChecksumAddress: isChecksumAddress,
  toChecksumAddress: toChecksumAddress,
  isFunction: isFunction,
  isString: isString,
  isObject: isObject,
  isBoolean: isBoolean,
  isArray: isArray,
  isJson: isJson,
  isBloom: isBloom,
  isTopic: isTopic,
};
