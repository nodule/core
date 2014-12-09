output = function (cb) {
  if (input.in[input.method]) {
    cb({
      out: input.in[input.method].call(input.in, input.args)
    });
  } else {
    cb({
      error: new Error('No such input method ' + input.method)
    });
  }
};
