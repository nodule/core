module.exports = {
  name: "actor",
  ns: "core",
  title: "Actor",
  description: "Chix Actor",
  phrases: {
    active: "Exposing Actor"
  },
  ports: {
    input: {
      actor: {
        title: "Actor",
        type: "Actor",
        "default": null
      },
      loader: {
        title: "Loader",
        type: "Loader",
        "default": null
      },
      io: {
        title: "IO Handler",
        type: "IOMapHandler",
        "default": null
      },
      pm: {
        title: "Process Manager",
        type: "ProcessManager",
        "default": null
      }
    },
    output: {
      actor: {
        title: "Actor",
        type: "Actor"
      },
      addNode: {
        title: "Node added",
        type: "xNode"
      },
      removeNode: {
        title: "Node removed",
        type: "xNode"
      },
      addLink: {
        title: "Link added",
        type: "xLink"
      },
      removeLink: {
        title: "Link removed",
        type: "xLink"
      },
      connect: {
        title: "Link connected",
        type: "xLink"
      },
      disconnect: {
        title: "Link disconnected",
        type: "xLink"
      },
      qm: {
        title: "Queue Manager",
        type: "QueueManager"
      },
      pm: {
        title: "Process Manager",
        type: "ProcessManager"
      },
      io: {
        title: "Io Handler",
        type: "IOMapHandler"
      },
      error: {
        title: "Error",
        type: "object"
      }
    }
  },
  dependencies: {
    npm: {
      "chix-flow": require('chix-flow')
    }
  },
  fn: function actor(input, $, output, state, done, cb, on, chix_flow) {
    var r = function() {
      var actor = $.actor || this.getParent();

      // probably should do almost the same as npmlog monitor

      actor.on('inputRequired', function(val) {
        output({
          error: $.create(val)
        });
      });

      actor.on('error', function(val) {
        output({
          error: $.create(val)
        });
      });

      actor.on('addNode', function(event) {
        output({
          addNode: $.create(event.node)
        });
      });

      actor.on('removeNode', function(event) {
        output({
          removeNode: $.create(event.node)
        });
      });

      actor.on('addLink', function(link) {
        output({
          addLink: $.create(link)
        });
      });

      actor.on('removeLink', function(link) {
        output({
          removeLink: $.create(link)
        });
      });

      actor.ioHandler.on('connect', function(link) {
        output({
          connect: $.create(link)
        });
      });

      actor.ioHandler.on('disconnect', function(link) {
        output({
          disconnect: $.create(link)
        });
      });

      // useally the actor already started so we send what we have
      // manually
      Object.keys(actor.nodes).forEach(function(key) {
        output({
          addNode: $.create(actor.nodes[key])
        });
      });

      Object.keys(actor.links).forEach(function(key) {
        output({
          addLink: $.create(actor.links[key])
        });

        // also report them all as connected for now
        output({
          connect: $.create(actor.links[key])
        });
      });

      output({
        io: $.create(actor.ioHandler),
        pm: $.create(actor.processManager)
      });

      // not really useful I guess
      /*
      actor.ioHandler.on('data', function (link) {
        output({
          disconnectLink: link
        });
      });
      */
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}