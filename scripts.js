    (function(){
    var hostname = window.location.hostname.toLowerCase();
    if (hostname == "localhost" || hostname.slice(0,3) == "192") {
    var port = 19002;//35729;
    var livereload = document.createElement("SCRIPT");
    livereload.setAttribute('src', 
    'http://'+window.location.hostname+':'+port+'/livereload.js');
    document.getElementsByTagName("BODY")[0].appendChild(livereload);
    }})();

try {

PR['registerLangHandler'](
  PR['createSimpleLexer'](
     // Shortcut patterns.
     [
      // The space production <s>
      //      [PR['PR_COMMENT'],     /^;[^\n\r]*/, null, ';'],
      ],
     // Fall-through patterns.
     [
      [PR['PR_LITERAL'], /^:[\w]+/],
      [PR['PR_KEYWORD'], /^([\n\r]([\w]+))|(GET)|(PUT)|(POST)|(DELETE)/, /\w/],
      [PR['PR_COMMENT'], /^#[^\n\r]*/],
      ]),
  ['definition']);

} catch (err) {}
/**
 * @fileoverview
 * Registers a language handler for Ruby.
 * When in doubt, this module attempts to mimic vim. 
 * Ruby grammar: http://www.cse.buffalo.edu/~regan/cse305/RubyBNF.pdf
 *
 * @author matthew.y.king@gmail.com
 */

PR['registerLangHandler'](PR['createSimpleLexer']([
  // # comment
  [PR['PR_COMMENT'], /^#[^\r\n]*/, null, '#']
  // 'foo', "foo", `foo`
  // String interpolation is unsupported.
, [PR['PR_STRING'], /^([\'\"\`])(?:(?!\1)|[^\\]|\\[\s\S])*?(?:\1|$)/, null, '\'\"\`']
], [
  // =begin
  // comment
  // =end
  // `=begin` must be located at the beginning of the line.
  // At this time, the case where `=begin` begins a source file is not accounted for.
  [PR['PR_COMMENT'], /^[\r\n]=begin\b[\s\S]*?(?:=end|$)/]
  // %q{}, %q[], %q(), %q<> (balanced quotes)
  // Nested balanced quotes are unsupported.
, [PR['PR_STRING'], /^%[qQ](?:\{(?:[^\}\\]|\\[\s\S])*?(?:\}|$)|\[(?:[^\]\\]|\\[\s\S])*?(?:\]|$)|\((?:[^\)\\]|\\[\s\S])*?(?:\)|$)|\<(?:[^\>\\]|\\[\s\S])*?(?:\>|$))/]
  // %q||, etc (generic non-balanced quotes)
, [PR['PR_STRING'], /^%[qQ](.)(?:(?!\1)|[^\\]|\\[\s\S])*?(?:\1|$)/]
  // <<HEREDOC
, [PR['PR_STRING'], /^<<(\w+)[\s\S]*?[\r\n]\1/]
  // <<'HEREDOC'
  // For quoted heredocs, ruby requires `'` or `"` quotes, and ruby does not allow escaped quotes or line breaks.
, [PR['PR_STRING'], /^<<(?=[\'\"]([ \w]+)[\'\"])(?:\'\1\'|\"\1\")[\s\S]*?[\r\n]\1/]
  // <<-HEREDOC
, [PR['PR_STRING'], /^<<-(\w+)[\s\S]*?\1/]
  // <<-'HEREDOC'
, [PR['PR_STRING'], /^<<-(?=[\'\"]([ \w]+)[\'\"])(?:\'\1\'|\"\1\")[\s\S]*?\1/]
  // /regex/options
, ['lang-regex', /^(?:^^\.?|[+-]|[!=]=?=?|\#|%=?|&&?=?|\(|\*=?|[+\-]=|->|\/=?|::?|<<?=?|>>?>?=?|,|;|\?|@|\[|~|{|\^\^?=?|\|\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof|when)\s*(\/(?:[^\/\\]|\\[\s\S])+?(?:\/|$)[a-z]*)/]
  // %r{}, %r[], %r{}, %r<> (balanced delimiters)
, [PR['PR_STRING'], /^%r(?:\{(?:[^\}\\]|\\[\s\S])*?(?:\}|$)|\[(?:[^\]\\]|\\[\s\S])*?(?:\]|$)|\((?:[^\)\\]|\\[\s\S])*?(?:\)|$)|\<(?:[^\>\\]|\\[\s\S])*?(?:\>|$))[a-z]*/]
  // %r||, etc (generic non-balanced delimiters)
, [PR['PR_STRING'], /^%r(.)(?:(?!\1)|[^\\]|\\[\s\S])*?(?:\1|$)[a-z]*/]
  // :symbol, :'symbol', symbol:
, [PR['PR_LITERAL'], /^(?::[\w\?!]+|:([\'\"\`])(?:(?!\1)|[^\\]|\\[\s\S])*?(?:\1|$)|[\w\?!]+:(?!:))/]
  // Exclude `::` (as in Foo::method)
, [PR['PR_PLAIN'], /^::/]
  // ?a (the character 'a')
, [PR['PR_LITERAL'], /^(?:\?.)\b/]
  // Exclude `method?`
, [PR['PR_PLAIN'], /^\w\?/]
  // 0b01, 0x1aA, 1.2e12
  // Accept `_` within numbers.
, [PR['PR_LITERAL'], /^\b(?:0b[_01]+|0x[_a-f0-9]+|\d+[_\d]*\.?(?:\d[_\d]*)?(?:e[+\-]?\d[_\d]*)?)\b/i]
  // Exclude `method1`
, [PR['PR_PLAIN'], /^\w\d+/]
  // scope variables (@foo, @@foo, $foo), capitalized types, CONSTANTs, built-in dollar variables
, [PR['PR_TYPE'], /^(?:(?:@|@@|\$)\w+|[A-Z]+[a-z]\w+|[A-Z][_A-Z0-9]*)\b|\$./]
  // keywords
, [PR['PR_KEYWORD'], /^\b(?:BEGIN|END|alias|and|begin|break|case|class|def|do|else|elsif|end|ensure|extend|false|for|if|lambda|in|include|module|next|nil|not|or|private|proc|protected|redo|require|rescue|retry|return|self|super|true|undef|unless|until|when|while|yield)\b/]
]), ['ruby']);

try {

PR['registerLangHandler'](
  PR['createSimpleLexer'](
     // Shortcut patterns.
     [
      // The space production <s>
      //      [PR['PR_COMMENT'],     /^;[^\n\r]*/, null, ';'],
      ],
     // Fall-through patterns.
     [
      [PR['PR_LITERAL'], /^[$][\w]+/],
      [PR['PR_PUNCTUATION'], /[$][\s]/],
      [PR['PR_PUNCTUATION'], /^[\?\&\\\!]/],
      [PR['PR_KEYWORD'], /^(cd|curl|export|gem|git|heroku|sudo|unzip|wget|grunt|npm|install|mkdir)/],
      [PR['PR_STRING'], /^[0-9]+/],
      [PR['PR_STRING'], /^[`][^`]*[`]/],
      [PR['PR_STRING'], /^[\"][^\"]*[\"]/],
      [PR['PR_STRING'], /^[\'][^\']*[\']/],
      [PR['PR_STRING'], /^[\n\r][^$][^\n\r]*/],
      [PR['PR_COMMENT'], /^#[^\n\r]*/],
      ]),
  ['term']);

} catch (err) {}

(function(prettyPrint) {
    prettyPrint();
    $(".prettyprint").addClass("prettify");
})(prettyPrint);

(function($) {
    
    function deg2rad(a) {
	var r= parseFloat(a)*(Math.PI*2)/360;
	return r;
    }
    function cos(a) {
	return Math.cos(deg2rad(a));
    }
    function sin(a) {
	return Math.sin(deg2rad(a));
    }

    $("[data-off-x],[data-off-y],[data-off-z],[data-off-ref]").each(function() {
	// Look for the reference step
	var ref, refId = $(this).data('off-ref');
	if (refId) ref = $("#"+refId)[0];
	else ref = $(this).prev()[0]; refId = $(ref).attr('id');
	var cur = this;

	// Auxiliar to get data
	function value(v) {
	    return parseFloat($(cur).data(v) || $(ref).data(v) || 0);
	}
	function offset(v) {
	    return parseFloat($(cur).data("off-"+v) || 0);
	}
	    
	// Compute a nice id
	var id = $(cur).attr('id'), next;
	if (!id) {
	    next = (parseFloat(refId.split("_")[1]) || 0) + 1;
	    id = refId.split("_")[0]+"_"+next;
	    $(cur).attr('id', id);
	}

	// Compute the scale
	var scl = value("scale") || 1;
	var fct = offset("scale") || 1;
	$(cur).attr("data-scale", (scl = scl * fct));

	// Compute rotate offset
	var rot = value("rotate-z") + offset("rotate-z");
	$(cur).attr("data-rotate-z", rot);
	var rsin = sin(rot), rcos = cos(rot);

	// Get and compute offsets
	var offX = offset("x") * scl;
	var offY = offset("y") * scl;
	var offZ = offset("z") * scl;
	var valX = value("x") + offX*rcos + offY*rsin;
	var valY = value("y") + offX*rsin + offY*rcos;
	var valZ = value("z") + offZ;
	$(cur).attr("data-x", valX.toFixed(6));
	$(cur).attr("data-y", valY.toFixed(6));
	$(cur).attr("data-z", valZ.toFixed(6));
    });

})(jQuery);



(function(impress,$,ga) {
    // Initialize impress
    var impress = impress();
    impress.init();

    // Show body
    $("body").addClass("in");
})(impress,jQuery);

/** google code ************************************************************/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-41577406-1', 'drpicox.github.io');
ga('send', 'pageview');
/** end google code ********************************************************/

(function(window,$,ga) {
    

    var path = window.location.pathname;
    
    $(".step").on("impress:stepenter", function (ev) {
	ga('send', 'pageview', path + "/" + $(this).attr('id'));
    });
    
})(window,jQuery,ga);
