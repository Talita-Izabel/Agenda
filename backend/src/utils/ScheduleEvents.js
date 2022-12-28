import Bree from 'bree'

async function init() {
  const bree = new Bree({
    // ... (see below) ...
  })

  // top-level await supported in Node v14.8+
  await bree.start()
}

init()
