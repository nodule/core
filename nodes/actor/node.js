output = function (cb) {

  var actor = $.actor || this.getParent();

  // probably should do almost the same as npmlog monitor

  actor.on('inputRequired', function (val) {
    cb({
      error: $.create(val)
    });
  });

  actor.on('error', function (val) {
    cb({
      error: $.create(val)
    });
  });

  actor.on('addNode', function (event) {
    cb({
      addNode: $.create(event.node)
    });
  });

  actor.on('removeNode', function (event) {
    cb({
      removeNode: $.create(event.node)
    });
  });

  actor.on('addLink', function (link) {
    cb({
      addLink: $.create(link)
    });
  });

  actor.on('removeLink', function (link) {
    cb({
      removeLink: $.create(link)
    });
  });

  actor.ioHandler.on('connect', function (link) {
    cb({
      connect: $.create(link)
    });
  });

  actor.ioHandler.on('disconnect', function (link) {
    cb({
      disconnect: $.create(link)
    });
  });

  // useally the actor already started so we send what we have
  // manually
  Object.keys(actor.nodes).forEach(function(key) {
    cb({addNode: $.create(actor.nodes[key])});
  });

  Object.keys(actor.links).forEach(function(key) {
    cb({addLink: $.create(actor.links[key])});

    // also report them all as connected for now
    cb({connect: $.create(actor.links[key])});
  });

  cb({
    io: $.create(actor.ioHandler),
    pm: $.create(actor.processManager)
  });

  // not really useful I guess
  /*
  actor.ioHandler.on('data', function (link) {
    cb({
      disconnectLink: link
    });
  });
  */

};
