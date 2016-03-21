output = function (cb) {
  if ($.in[$.method]) {
    cb({
      out: $.write('in', $.in[$.method].call($.in, $.args))
    });
  } else {
    cb({
      error: $.create(new Error('No such input method ' + $.method))
    });
  }
};
