(self["webpackChunkwebpack_templete_env"] = self["webpackChunkwebpack_templete_env"] || []).push([[143],{

/***/ 9336:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(5827);
;// CONCATENATED MODULE: ./src/js/reduce.ts


/* harmony default export */ function reduce() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return args.reduce(function (x, y) {
    return x + y;
  });
}
// EXTERNAL MODULE: ./node_modules/z-util-page/lib/zutilpage.js
var zutilpage = __webpack_require__(8047);
;// CONCATENATED MODULE: ./src/app.ts





console.log(zutilpage);
console.log(reduce(2));
new Promise(function () {
  console.log(3);
});
[1, 2, 3].includes(3);

/***/ }),

/***/ 8047:
/***/ (function(module) {

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_159__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var index_1 = __importDefault(__nested_webpack_require_159__(1));

var index_2 = __importDefault(__nested_webpack_require_159__(2));

var index_3 = __nested_webpack_require_159__(3);

var index_4 = __importDefault(__nested_webpack_require_159__(4));

var FileHelper = __importStar(__nested_webpack_require_159__(5));

var index_5 = __importDefault(__nested_webpack_require_159__(7));

var Reactive = __importStar(__nested_webpack_require_159__(9));

var Utils = {
  debounce: index_1.default,
  throttle: index_2.default,
  deepClone: index_3.deepClone,
  getType: index_3.getType,
  Http: index_5.default,
  UuidFactory: index_4.default,
  FileHelper: FileHelper,
  Reactive: Reactive
};
exports["default"] = Utils;

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * 函数防抖
 * @param func 待处理函数
 * @param wait 函数执行延迟时间
 * @param immediatel 是否立刻执行
 */

function debounce(func, wait, immediatel) {
  var timeout,
      content,
      args,
      callbacks = [],
      res;

  var debounced = function () {
    content = this;
    args = arguments;

    if (immediatel && !timeout) {
      res = func.apply(content, args);
      var resolvedRes_1 = res;
      callbacks.forEach(function (callback) {
        if (callback instanceof Function) resolvedRes_1 = callback(resolvedRes_1);
      });
    }

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(content, args);
      timeout = null;
    }, wait);
    return res;
  };

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.then = function (callback) {
    callbacks.push(callback);
    return this;
  };

  return debounced;
}

exports["default"] = debounce;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_3242__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var index_1 = __nested_webpack_require_3242__(3);

var defaultConfig = {
  leading: true,
  trailing: false
};
/**
 * 函数节流
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 */

function throttle(func, wait, options) {
  options = Object.assign((0, index_1.deepClone)(defaultConfig), options);
  if (options.leading === false && options.trailing === false) throw 'leading, trailing不能同时为false';
  var timeout = null,
      args,
      content,
      res;

  var throttled = function () {
    args = arguments;
    content = this;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        if (options.trailing) func.apply(content, args);
      }, wait);
      if (options.leading) res = func.apply(content, args);
    }

    return res;
  };

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return throttled;
}

exports["default"] = throttle;

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getType = exports.deepClone = void 0;
/**
 * 深拷贝
 * @param value 待克隆值
 */

var cacheMap = new WeakMap();
var typeHandleMap = {
  'Object': function (value) {
    var cloneTarget = new value.constructor();
    forEach(Object.keys(value), function (val, key) {
      cloneTarget[val] = deepClone(value[val]);
    });
    return cloneTarget;
  },
  'Array': function (value) {
    var cloneTarget = [];
    forEach(value, function (val, key) {
      cloneTarget[key] = deepClone(value[key]);
    });
    return cloneTarget;
  },
  'Set': function (value) {
    var cloneTarget = new value.constructor();
    value.forEach(function (val) {
      cloneTarget.add(deepClone(val));
    });
    return cloneTarget;
  },
  'Map': function (value) {
    var cloneTarget = new value.constructor();
    value.forEach(function (val, key) {
      cloneTarget.set(deepClone(key), deepClone(val));
    });
    return cloneTarget;
  },
  'Symbol': function (value) {
    return Object(Symbol.prototype.valueOf.call(value));
  },
  'HTMLElement': function (value) {
    return value.cloneNode();
  }
};
var baseTypeList = ['boolean', 'number', 'string', 'undefined', "function", "symbol", 'Null', "Math", "Json", "Global"];
var simpleTypeList = ["Boolean", "Number", 'String', 'Date', 'Error', "Regexp"];

function deepClone(value) {
  var type = typeof value;
  if (type === 'object') type = getType(value);
  if (value instanceof HTMLElement) type = 'HTMLElement';
  if (baseTypeList.includes(type)) return value;else if (simpleTypeList.includes(type)) return new value.constructor(value);
  var cloneTarget = cacheMap.get(value);

  if (cloneTarget === undefined) {
    var handle = typeHandleMap[type];
    if (handle) cloneTarget = handle(value);else cloneTarget = value;
    cacheMap.set(value, cloneTarget);
  }

  clear();
  return cloneTarget;
}

exports.deepClone = deepClone;
/**
 * 清理缓存
 */

var isFlush = false;

function clear() {
  if (!isFlush) {
    isFlush = true;
    var promise = Promise.resolve();
    promise.then(function () {
      cacheMap = new WeakMap();
    });
    promise.finally(function () {
      isFlush = false;
    });
  }
}
/**
 * while循环
 * @param list 待循环列表
 * @param handle 循环行为
 */


function forEach(list, handle) {
  var index = -1;
  var length = list.length;

  while (++index < length) {
    handle(list[index], index);
  }
}
/**
 * 获取数据类型
 * @param value
 */


function getType(value) {
  try {
    return Object.prototype.toString.call(value).match(/\[.+\s(.+)\]/)[1];
  } catch (e) {
    throw e;
  }
}

exports.getType = getType;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = {
  uuid: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";

    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    s[14] = "4";
    s[19] = hexDigits.substr(Number(s[19]) & 0x3 | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  },
  guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  _guid: function () {
    function S4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  },
  _uuid: function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      var r; // rfc4122 requires these characters

      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4'; // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5

      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  }
};

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_8812__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.choose = exports.read = exports.write = void 0;

var index_1 = __nested_webpack_require_8812__(6);
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */


function saveFile(url, saveFileName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url);
  }

  var alink = document.createElement('a');
  alink.href = url;
  alink.download = saveFileName || '';
  (0, index_1.clickElement)(alink);
}

exports.write = saveFile;

var FileReaderDecorate =
/** @class */
function () {
  function FileReaderDecorate(file) {
    this.reader = new FileReader();
    this.file = file;
  } //读取操作发生中断时触发


  FileReaderDecorate.prototype.abort = function (fun) {
    var _this = this;

    this.reader.addEventListener('abort', function () {
      fun(_this.reader);
    });
    return this;
  }; //读取操作发生错误时触发。


  FileReaderDecorate.prototype.error = function (fun) {
    var _this = this;

    this.reader.addEventListener('error', function () {
      fun(_this.reader.error);
    });
    return this;
  }; //读取操作完成时触发。


  FileReaderDecorate.prototype.load = function (fun) {
    var _this = this;

    this.reader.addEventListener('load', function () {
      fun(_this.reader);
    });
    return this;
  }; //读取操作开始时触发。


  FileReaderDecorate.prototype.loadstart = function (fun) {
    var _this = this;

    this.reader.addEventListener('loadstart', function () {
      fun(_this.reader);
    });
    return this;
  }; //读取操作结束时（要么成功，要么失败）触发。


  FileReaderDecorate.prototype.loadend = function (fun) {
    var _this = this;

    this.reader.addEventListener('loadend', function () {
      fun(_this.reader.result);
    });
    return this;
  }; //在读取Blob时触发。


  FileReaderDecorate.prototype.progress = function (fun) {
    var _this = this;

    this.reader.addEventListener('progress', function () {
      fun(_this.reader);
    });
    return this;
  };

  FileReaderDecorate.prototype.getStatus = function () {
    return this.reader.readyState;
  };

  FileReaderDecorate.prototype.getResult = function () {
    return this.reader.result;
  };

  FileReaderDecorate.prototype.start = function (type) {
    try {
      Reflect.get(this.reader, "readAs" + type).call(this.reader, this.file);
    } catch (error) {
      console.error(error);
    }

    return this;
  };

  FileReaderDecorate.prototype.stop = function () {
    this.reader.abort();
    return this;
  };

  return FileReaderDecorate;
}();

function readFile(file) {
  return new FileReaderDecorate(file);
}

exports.read = readFile;

function chooseFile(options, callback) {
  if (options === void 0) {
    options = {};
  }

  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', (options.accept || []).join(','));
  input.setAttribute('capture', options.capture || '');
  input.setAttribute('multiple', (options.multiple || false).toString());
  input.addEventListener('change', function (e) {
    callback(input.files);
  });
  (0, index_1.clickElement)(input);
}

exports.choose = chooseFile;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clickElement = void 0;

function clickElement(el) {
  if (el.click && el.click instanceof Function) el.click();else if (window.MouseEvent) {
    el.dispatchEvent(new MouseEvent('click'));
  } else {
    var event_1 = document.createEvent('MouseEvents');
    event_1.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(event_1);
  }
}

exports.clickElement = clickElement;

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_12639__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var index_1 = __nested_webpack_require_12639__(3);

var FileHelper = __importStar(__nested_webpack_require_12639__(5));

var message_1 = __nested_webpack_require_12639__(8);

var Http =
/** @class */
function () {
  function Http(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = {
      timeout: 10000,
      baseUrl: "",
      contentType: 'application/json',
      responseType: 'json'
    };
    Object.assign(this.options, options);
  } //XMLHttpRequest异步请求


  Http.prototype.ajax = function (param) {
    var xhr = new XMLHttpRequest();
    submit.call(this, xhr, param);
    return new PromiseHandle(xhr);
  }; //XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。


  Http.prototype.ajaxAsync = function (param) {
    var xhr = new XMLHttpRequest();
    submit.call(this, xhr, param, true);
    return xhr.response;
  }; //fetch


  Http.prototype.fetch = function (param) {};

  return Http;
}();

var PromiseHandle =
/** @class */
function () {
  function PromiseHandle(xhr) {
    var _this = this;

    this.xhr = xhr;
    this.xhr.addEventListener('load', function () {
      _this.result = _this.xhr.response;
    });
  }

  PromiseHandle.prototype.then = function (callback) {
    var _this = this;

    this.xhr.addEventListener('load', function () {
      callback(new message_1.Message(_this.xhr));
    });
    return this;
  };

  PromiseHandle.prototype.catch = function (callback) {
    var _this = this;

    this.xhr.addEventListener('error', function () {
      callback(new message_1.Message(_this.xhr));
    });
    return this;
  };

  PromiseHandle.prototype.finally = function (callback) {
    var _this = this;

    this.xhr.addEventListener('loadend', function () {
      callback(new message_1.Message(_this.xhr));
    });
    return this;
  };

  PromiseHandle.prototype.downProgress = function (callback) {
    var _this = this;

    this.xhr.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new message_1.UploadMessage(_this.xhr, '下载中', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(_this.xhr, '无法计算进度', null));
      }
    });
    return this;
  };

  PromiseHandle.prototype.upProgress = function (callback) {
    var _this = this;

    this.xhr.upload.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new message_1.UploadMessage(_this.xhr, '上传中', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(_this.xhr, '无法计算进度', null));
      }
    });
    return this;
  };

  PromiseHandle.prototype.abort = function () {
    this.xhr.abort();
    return this;
  };

  return PromiseHandle;
}();

function warp(xhr, param, isInitHeader, isAsync) {
  if (isInitHeader === void 0) {
    isInitHeader = true;
  }

  if (isAsync === void 0) {
    isAsync = false;
  }

  if (isInitHeader) {
    var header_1 = param.header || {};
    Object.keys(header_1).forEach(function (key) {
      xhr.setRequestHeader(key, header_1[key]);
    });
    if (!header_1['Content-Type']) xhr.setRequestHeader("Content-Type", this.options.contentType);
  }

  if (!isAsync) {
    xhr.timeout = param.timeout || this.options.timeout;
    xhr.responseType = param.type || this.options.responseType;
    xhr.addEventListener('abort', function () {
      console.warn('HTTP请求被中止');
    });
    xhr.addEventListener('error', function () {
      console.warn(xhr.statusText);
    });
    xhr.addEventListener('timeout', function () {
      console.warn('HTTP请求超时');
    });
  }
}

function submit(xhr, param, isAsync) {
  if (isAsync === void 0) {
    isAsync = false;
  }

  if (!param.method || param.method && param.method.toUpperCase() === "GET") {
    var url = this.options.baseUrl + (param.url || '');
    var suffix = url.match(/(?:\?.*)?$/);
    var paramString_1 = suffix === null ? "?" : "&";
    Object.keys(param.data || {}).forEach(function (key) {
      paramString_1 += encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&";
    });
    xhr.open("GET", url + paramString_1, true);
    warp.call(this, xhr, param, true, isAsync);
  } else {
    xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
    var type = this.options.contentType;
    if (param.header && param.header['Content-Type']) type = param.header['Content-Type'];
    var excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, this.options.contentType);
    warp.call(this, xhr, param, type !== "multipart/form-data", isAsync);
    excute.call(this, xhr, param);
  }
}

var HttpHandle = {
  'application/x-www-form-urlencoded': function (xhr, param) {
    var result = [];
    Object.keys(param.data || {}).forEach(function (key) {
      var val = param.data[key];
      result.push(encodeURIComponent(key) + "=" + encodeURIComponent(val ? val.toString() : val));
    });
    Promise.resolve().then(function () {
      xhr.send(result.join("&"));
    });
  },
  'text/plain': function (xhr, param) {
    var result = [];
    Object.keys(param.data || {}).forEach(function (key) {
      var val = param.data[key];
      result.push(key.replace(/[\s\=\\]/g, "\\$&") + "=" + (val ? val.toString().replace(/[\s\=\\]/g, "\\$&") : val));
    });
    Promise.resolve().then(function () {
      xhr.send(result.join("\r\n"));
    });
  },
  'application/json': function (xhr, param) {
    Promise.resolve().then(function () {
      xhr.send(JSON.stringify(param.data || {}));
    });
  },
  'multipart/form-data': function (xhr, param) {
    var header = param.header || {};
    Object.keys(header).forEach(function (key) {
      if (key === "Content-Type") return;
      xhr.setRequestHeader(key, header[key]);
    });

    if (window.FormData) {
      var formData_1 = new FormData();
      Object.keys(param.data || {}).forEach(function (key) {
        formData_1.append(key, param.data[key]);
      });
      if (param.file) Object.keys(param.file).forEach(function (key) {
        formData_1.append(key, param.file[key]);
      });
      Promise.resolve().then(function () {
        xhr.send(formData_1);
      });
    } else {
      var result_1 = [];
      Object.keys(param.data || {}).forEach(function (key) {
        var val = param.data[key];
        result_1.push("Content-Disposition: form-data; name=\"" + key + "\"\r\n\r\n" + (val ? val.toString() : val) + "\r\n");
      });
      var index_2 = 0;
      var boundary_1 = "---------------------------" + Date.now().toString(16);
      xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary_1);

      if (param.file && (0, index_1.getType)(param.file) === "Object") {
        Object.keys(param.file).forEach(function (key) {
          var file = param.file[key];
          var type = (0, index_1.getType)(file);

          if (type === "File" || type === "Blob") {
            index_2++;
            FileHelper.read(file).load(function (res) {
              var name = window.File && file instanceof File ? file.name : key + '.blob';
              result_1.push("Content-Disposition: form-data; name=\"" + key + "\"; filename=\"" + name + "\"\r\nContent-Type: " + (file.type ? file.type : "octet-stream") + "\r\n\r\n" + res.result + "\r\n");
            }).loadend(function () {
              index_2--;

              if (index_2 === 0) {
                var combineResult_1 = "--" + boundary_1 + "\r\n" + result_1.join("--" + boundary_1 + "\r\n") + "--" + boundary_1 + "--\r\n";
                Promise.resolve().then(function () {
                  xhr.send(combineResult_1);
                });
              }
            }).start("BinaryString");
          }
        });
      }

      if (index_2 === 0) {
        Promise.resolve().then(function () {
          xhr.send("--" + boundary_1 + "\r\n" + result_1.join("--" + boundary_1 + "\r\n") + "--" + boundary_1 + "--\r\n");
        });
      }
    }
  }
};
exports["default"] = Http;

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Message = exports.UploadMessage = void 0;

var Message =
/** @class */
function () {
  function Message(xhr) {
    this.status = xhr.status;
    this.message = xhr.statusText;
    this.data = xhr.response;
  }

  return Message;
}();

exports.Message = Message;

var UploadMessage =
/** @class */
function () {
  function UploadMessage(xhr, message, data) {
    this.status = xhr.status;
    this.message = message;
    this.data = data;
  }

  return UploadMessage;
}();

exports.UploadMessage = UploadMessage;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.watch = exports.computed = exports.effect = exports.reactive = exports.ref = void 0;
var bucket = new WeakMap();
var reactiveMap = new Map();
var effectStack = new Array();
var ITERATE_KEY = Symbol();
var source = Symbol();
var activeEffect = null;
var shouldTrack = true;
var TriggerType;

(function (TriggerType) {
  TriggerType[TriggerType["SET"] = 0] = "SET";
  TriggerType[TriggerType["ADD"] = 1] = "ADD";
  TriggerType[TriggerType["DELETE"] = 2] = "DELETE";
})(TriggerType || (TriggerType = {}));

var arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(function (method) {
  var originMethod = Reflect.get(Array.prototype, method);
  Reflect.set(arrayInstrumentations, method, function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var res = originMethod.apply(this, args);
    if (res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
    return res;
  });
});
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(function (method) {
  var originMethod = Reflect.get(Array.prototype, method);
  Reflect.set(arrayInstrumentations, method, function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    shouldTrack = false;
    var res = originMethod.apply(this, args);
    shouldTrack = true;
    return res;
  });
});

function track(target, p) {
  if (!activeEffect || !shouldTrack) {
    return;
  }

  var depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target, depsMap = new Map());
  }

  var deps = depsMap.get(p);

  if (!deps) {
    depsMap.set(p, deps = new Set());
  }

  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

function trigger(target, p, type, value) {
  var depsMap = bucket.get(target);

  if (!depsMap) {
    return true;
  }

  var effects = depsMap.get(p);
  var effectsToRun = new Set();
  effects && effects.forEach(function (effectFn) {
    if (effectFn !== activeEffect) effectsToRun.add(effectFn);
  });

  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    var iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }

  if (type === TriggerType.ADD && Array.isArray(target)) {
    var lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }

  if (Array.isArray(target) && p === 'length') {
    depsMap.forEach(function (effects, key) {
      if (Number(key) >= Number(value)) {
        effects.forEach(function (effectFn) {
          if (effectFn !== activeEffect) effectsToRun.add(effectFn);
        });
      }
    });
    var lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }

  effectsToRun.forEach(function (fn) {
    if (typeof fn.options.schedule === 'function') {
      fn.options.schedule(fn);
    } else {
      fn();
    }
  });
  return true;
}

function cleanup(effectFn) {
  effectFn.deps.forEach(function (deps) {
    deps.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

function ref(value, isReadonly) {
  if (isReadonly === void 0) {
    isReadonly = false;
  }

  return reactive({
    value: value
  }, true, isReadonly);
}

exports.ref = ref;

function reactive(value, isShadow, isReadonly) {
  if (isShadow === void 0) {
    isShadow = false;
  }

  if (isReadonly === void 0) {
    isReadonly = false;
  }

  return new Proxy(value, {
    get: function (target, p, reciver) {
      if (p === source) return target;

      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)) {
        return Reflect.get(arrayInstrumentations, p, reciver);
      }

      if (!isReadonly && typeof p !== 'symbol') track(target, p);
      var res = Reflect.get(target, p, reciver);
      if (isShadow) return res;

      if (typeof res === 'object' && res != null) {
        var existionProxy = reactiveMap.get(res);
        if (existionProxy) return existionProxy;
        var proxy = reactive(res, isShadow, isReadonly);
        reactiveMap.set(res, proxy);
        return proxy;
      }

      return res;
    },
    has: function (target, p) {
      if (!isReadonly) track(target, p);
      return Reflect.has(target, p);
    },
    ownKeys: function (target) {
      if (!isReadonly) track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty: function (target, p) {
      if (isReadonly) {
        console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
        return false;
      }

      var hadKey = Object.prototype.hasOwnProperty.call(target, p);
      var res = Reflect.deleteProperty(target, p);

      if (res && hadKey) {
        trigger(target, p, TriggerType.DELETE, 0);
      }

      return true;
    },
    set: function (target, p, value, reciver) {
      if (isReadonly) {
        console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
        return false;
      }

      var oldValue = Reflect.get(target, p);
      var type = Array.isArray(target) ? Number(p) < target.length ? TriggerType.SET : TriggerType.ADD : Object.prototype.hasOwnProperty.call(target, p) ? TriggerType.SET : TriggerType.ADD;
      var res = Reflect.set(target, p, value, reciver);

      if (target === reciver[source]) {
        if (oldValue !== value && (oldValue === oldValue || value === value)) {
          trigger(target, p, type, value);
        }
      }

      return true;
    }
  });
}

exports.reactive = reactive;

function effect(func, options) {
  if (options === void 0) {
    options = {};
  }

  var effectFn = function () {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    var res = func();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    return res;
  };

  effectFn.deps = [];
  effectFn.options = options;
  if (!options.lazy) effectFn();
  return effectFn;
}

exports.effect = effect;

function computed(getter) {
  var value;
  var dirty = true;
  var effectFn = effect(getter, {
    lazy: true,
    schedule: function () {
      if (!dirty) {
        dirty = true;
        trigger(obj, 'value', TriggerType.SET, 0);
      }
    }
  });
  var obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }

      track(obj, 'value');
      return value;
    }

  };
  return obj;
}

exports.computed = computed;

function traverse(value, seen) {
  if (seen === void 0) {
    seen = new Set();
  }

  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  seen.add(value);

  for (var k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch(source, cb, options) {
  if (options === void 0) {
    options = {};
  }

  var getter;
  if (typeof source === 'function') getter = source;else getter = function () {
    return traverse(source);
  };
  var oldValue, newValue, cleanup;

  function onInvalidate(fn) {
    cleanup = fn;
  }

  var job = function () {
    newValue = effectFn();
    if (cleanup) cleanup();
    cb(oldValue, newValue, onInvalidate);
    oldValue = newValue;
  };

  var effectFn = effect(function () {
    return getter();
  }, {
    lazy: true,
    schedule: function () {
      if (options.flush === 'post') {
        var p = Promise.resolve();
        p.then(job);
      } else {
        job();
      }
    }
  });
  if (options.immediate) job();else oldValue = effectFn();
}

exports.watch = watch;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_30614__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_30614__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nested_webpack_require_30614__(0);
/******/ 	module.exports.Utils = __webpack_exports__;
/******/ 	
/******/ })()
;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [496], function() { return __webpack_exec__(9336); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app.9ae7c86720.js.map