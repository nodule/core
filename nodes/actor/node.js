output = function (cb) {

  var actor = input.actor || this.getParent();

  // probably should do almost the same as npmlog monitor

  actor.on('inputRequired', function (data) {
    cb({
      error: data
    });
  });

  actor.on('error', function (data) {
    cb({
      error: data
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
      connectLink: link
    });
  });

  actor.ioHandler.on('disconnect', function (link) {
    cb({
      disconnectLink: link
    });
  });

  cb({
    qm: actor.ioHandler.queueManager,
    io: actor.ioHandler
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
