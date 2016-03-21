output = function (cb) {
  if ($.in[$.method]) {
    cb({
      out: $.in[$.method].call($.in, $.args)
    });
  } else {
    cb({
      error: new Error('No such input method ' + $.method)
    });
  }
};
