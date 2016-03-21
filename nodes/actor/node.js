output = function (cb) {

  var actor = $.actor || this.getParent();

  // probably should do almost the same as npmlog monitor

  actor.on('inputRequired', function (val) {
    cb({
      error: val
    });
  });

  actor.on('error', function (val) {
    cb({
      error: val
    });
  });

  actor.on('addNode', function (event) {
    cb({
      addNode: event.node
    });
  });

  actor.on('removeNode', function (event) {
    cb({
      removeNode: event.node
    });
  });

  actor.on('addLink', function (link) {
    cb({
      addLink: link
    });
  });

  actor.on('removeLink', function (link) {
    cb({
      removeLink: link
    });
  });

  actor.ioHandler.on('connect', function (link) {
    cb({
      connect: link
    });
  });

  actor.ioHandler.on('disconnect', function (link) {
    cb({
      disconnect: link
    });
  });

  // useally the actor already started so we send what we have
  // manually
  Object.keys(actor.nodes).forEach(function(key) {
    cb({addNode: actor.nodes[key]});
  });

  Object.keys(actor.links).forEach(function(key) {
    cb({addLink: actor.links[key]});

    // also report them all as connected for now
    cb({connect: actor.links[key]});
  });

  cb({
    qm: actor.ioHandler.queueManager,
    io: actor.ioHandler,
    pm: actor.processManager
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
