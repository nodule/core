module.exports = {
  name: "poll",
  ns: "core",
  title: "Polling",
  description: "Polls an instance on request",
  phrases: {
    active: "Polling data"
  },
  ports: {
    input: {
      "in": {
        title: "Input object",
        type: "any",
        async: true,
        fn: function __IN__(data, x, source, state, input, output) {
          var r = function() {

          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      }
    },
    output: {
      out: {
        title: "Output",
        type: "any"
      }
    }
  },
  state: {}
}