// aliases.js
/**
 * Configure task aliaes.
 * @link https://github.com/firstandthird/load-grunt-config#aliases
 */
module.exports = {
<%
var keys = defaultTasks.keys(),
count = 0;
for (var i; i <= keys.length; i++) {
%><%= keys[i] + ': ' + defaultTasks[key[i]] + if(count < keys.length) ? ",\n" : '\n'%>
<%
} // done!
%>
