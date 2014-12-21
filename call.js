module.exports = {
  name: "call",
  ns: "core",
  title: "Call a method",
  description: "Calls a method with the args given",
  phrases: {
    active: "Calling method"
  },
  ports: {
    input: {
      "in": {
        title: "Input object",
        type: "any"
      },
      args: {
        title: "Arguments",
        type: "array",
        "default": null
      },
      method: {
        title: "Method",
        type: "string"
      }
    },
    output: {
      out: {
        title: "Output",
        type: "any"
      },
      error: {
        title: "Error",
        type: "Error"
      }
    }
  },
  fn: function call(input, output, state, done, cb, on) {
    var r = function() {
      if (input.in[input.method]) {
        output({
          out: input.in[input.method].call(input.in, input.args)
        });
      } else {
        output({
          error: new Error('No such input method ' + input.method)
        });
      }
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}