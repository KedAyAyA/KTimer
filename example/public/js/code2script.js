function code2script (className) {
  var collections = document.querySelectorAll(className)
  var len = collections.length
  var body = document.querySelector('body')
  for (var i = 0; i < len; i++) {
    var script = document.createElement('script')
    console.log(collections[i].textContent)
    script.textContent = collections[i].textContent
    body.appendChild(script)
  }
}