/**
 *
 *
 * @param {*} urlString
 * @return {*} 
 */
function isDomain(urlString) {
  var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    // below
    '(\\:\\d+))');  // validate port
  // or below
  //  '(\\:\\d+))?(\\/[-a-z\\d%_.~+]*)*' + ''); // validate port and path
  // continue all next for URL
  // '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  // '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

module.exports = isDomain;
