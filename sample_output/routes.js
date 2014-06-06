// PLUGINS

// Cookie Plugin
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// jQuery URL Parser plugin (No jQuery version!) - https://github.com/allmarkedup/jQuery-URL-Parser/tree/no-jquery
// Written by Mark Perkins, mark@allmarkedup.com
// License: http://unlicense.org/ (i.e. do what you want with it!)

var purl = (function(undefined) {
    
    var tag2attr = {
        a       : 'href',
        img     : 'src',
        form    : 'action',
        base    : 'href',
        script  : 'src',
        iframe  : 'src',
        link    : 'href'
    },
    
	key = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"], // keys available to query
	
	aliases = { "anchor" : "fragment" }, // aliases for backwards compatability

	parser = {
		strict  : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
		loose   :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
	},
	
	querystring_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g, // supports both ampersand and semicolon-delimted query string key/value pairs
	
	fragment_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g; // supports both ampersand and semicolon-delimted fragment key/value pairs
	
	function parseUri( url, strictMode )
	{
		var str = decodeURI( url ),
		    res   = parser[ strictMode || false ? "strict" : "loose" ].exec( str ),
		    uri = { attr : {}, param : {}, seg : {} },
		    i   = 14;
		
		while ( i-- )
		{
			uri.attr[ key[i] ] = res[i] || "";
		}
		
		// build query and fragment parameters
		
		uri.param['query'] = {};
		uri.param['fragment'] = {};
		
		uri.attr['query'].replace( querystring_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['query'][$1] = $2;
			}
		});
		
		uri.attr['fragment'].replace( fragment_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['fragment'][$1] = $2;
			}
		});
				
		// split path and fragement into segments
		
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');
        
        // compile a 'base' domain attribute
        
        uri.attr['base'] = uri.attr.host ? uri.attr.protocol+"://"+uri.attr.host + (uri.attr.port ? ":"+uri.attr.port : '') : '';
        
		return uri;
	};
	
	function getAttrName( elm )
	{
		var tn = elm.tagName;
		if ( tn !== undefined ) return tag2attr[tn.toLowerCase()];
		return tn;
	}
	
	return (function( url, strictMode ) {
	    if ( arguments.length === 1 && url === true )
        {
            strictMode = true;
            url = undefined;
        }
        
        strictMode = strictMode || false;
        url = url || window.location.toString();
        	    	            
        return {
            
            data : parseUri(url, strictMode),
            
            // get various attributes from the URI
            attr : function( attr )
            {
                attr = aliases[attr] || attr;
                return attr !== undefined ? this.data.attr[attr] : this.data.attr;
            },
            
            // return query string parameters
            param : function( param )
            {
                return param !== undefined ? this.data.param.query[param] : this.data.param.query;
            },
            
            // return fragment parameters
            fparam : function( param )
            {
                return param !== undefined ? this.data.param.fragment[param] : this.data.param.fragment;
            },
            
            // return path segments
            segment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.path;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];                    
                }
            },
            
            // return fragment segments
            fsegment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.fragment;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];                    
                }
            }
            
        };
        
	});
	
})();

var map = {"routes":[{"route":{"id":49,"inbound":"/video/entry","outbound":"/video_entry"}},{"route":{"id":21,"inbound":"/video","outbound":"/video"}},{"route":{"id":121,"inbound":"/search","outbound":"/search"}},{"route":{"id":48,"inbound":"/royalties","outbound":"/creators_royalties"}},{"route":{"id":118,"inbound":"/photos/entry","outbound":"/photos_entry"}},{"route":{"id":119,"inbound":"/photos/archive/","outbound":"/photos_archive/"}},{"route":{"id":112,"inbound":"/offices","outbound":"/related/category"}},{"route":{"id":46,"inbound":"/news/whats_new","outbound":"/news"}},{"route":{"id":110,"inbound":"/news/tag","outbound":"/related/category"}},{"route":{"id":34,"inbound":"/news/entry","outbound":"/news_entry"}},{"route":{"id":24,"inbound":"/news/all_news","outbound":"/news"}},{"route":{"id":26,"inbound":"/news","outbound":"/news"}},{"route":{"id":129,"inbound":"/newmedia","outbound":"/license/category/new_media"}},{"route":{"id":45,"inbound":"/musicworld/entry","outbound":"/news_entry"}},{"route":{"id":126,"inbound":"/musicworld","outbound":"/musicworld"}},{"route":{"id":127,"inbound":"/licensing/faq","outbound":"/license_faq"}},{"route":{"id":117,"inbound":"/licensing/entry","outbound":"/license"}},{"route":{"id":14,"inbound":"/licensing","outbound":"/license"}},{"route":{"id":125,"inbound":"/legal/entry/533243","outbound":"/about/terms_and_conditions_of_use"}},{"route":{"id":146,"inbound":"/genres/entry","outbound":"/related/category"}},{"route":{"id":41,"inbound":"/faq/entry","outbound":"/creators_faq"}},{"route":{"id":40,"inbound":"/faq/category","outbound":"/creators_faq/category"}},{"route":{"id":19,"inbound":"/faq","outbound":"/creators_faq"}},{"route":{"id":113,"inbound":"/events/tag","outbound":"/related/category"}},{"route":{"id":39,"inbound":"/events/entry","outbound":"/calendar_entry"}},{"route":{"id":35,"inbound":"/events","outbound":"/calendar"}},{"route":{"id":47,"inbound":"/creators/royalty","outbound":"/creators_royalties"}},{"route":{"id":28,"inbound":"/creators/detail/538171","outbound":"/forms"}},{"route":{"id":140,"inbound":"/creators/detail","outbound":"/creators_entry"}},{"route":{"id":18,"inbound":"/creators","outbound":"/creators"}},{"route":{"id":130,"inbound":"/business","outbound":"/related/category/business_sense"}},{"route":{"id":128,"inbound":"/benefits/entry","outbound":"/benefits"}},{"route":{"id":22,"inbound":"/benefits","outbound":"/benefits"}},{"route":{"id":115,"inbound":"/awards/entry/category","outbound":"/related/category"}},{"route":{"id":109,"inbound":"/affiliate","outbound":"/related/category"}},{"route":{"id":38,"inbound":"/about/entry/533331","outbound":"/creators_contact"}},{"route":{"id":134,"inbound":"/about/entry","outbound":"/about"}},{"route":{"id":124,"inbound":"/about","outbound":"/about/about_bmi"}},{"route":{"id":107,"inbound":"/","outbound":""}}]};

// MOBILE DETECTION
function redirect_to_mobile(redirect) {
  window.location.href = "/mobile" + redirect;
}

// Check for supported mobile browsers
if (navigator.userAgent.match(/Android/i) ||
    (navigator.userAgent.match(/BlackBerry/i) && navigator.userAgent.search(/WebKit/i) > 0) || 
    navigator.userAgent.match(/iPhone/i) || 
    navigator.userAgent.match(/iPod/i) ||
    location.href.match(/mobile=force/i) == 'mobile=force') {
      
    // External links (with target=_blank)
    if (location.href.match(/mobile=skip/i) || readCookie('mobile2') == "skip") {

    // Normal links
    } else {
      
      // Parse inbound route
      var url = purl(window.location.href);
      var source = url.attr('source');
      var relative = url.attr('relative');
      var path = url.attr('path');
      var query = url.attr('query');
      var segment_count = path.split(/\//).length - 1;
      var segment = new Array();
      var i = 1;
      while (i <= segment_count) {
        segment[i] = url.segment(i);
        i++;
      }
      
      // Remove trailing slash from all paths (except root)
      if (path.length > 1 && path.charAt(path.length-1) == '/') {
        path = path.slice(0, -1);
      }
      
      // Load routes feed
      if (path != '') {
        
        var match = '';
        var redirect = '';
        var matcher = "/" + segment[1] + "/" + segment[2];
        
        // Look for match
        for (var i = 0; i < map.routes.length; i++) { 
          
          val = map.routes[i];
          
          // Simple route
          if (path == map.routes[i].route.inbound) {
            
            match = "Match found (bmi.com" + val.route.inbound + " ----> /mobile" + val.route.outbound + ")";
            redirect = val.route.outbound;
            
            if (query != '' && redirect.match('\\?') == null && query != 'mobile=force') {
              redirect = redirect + "?" + query;
            }
            
            // console.log(match);
            
            redirect_to_mobile(redirect);
            break;
            
          // Wildcard route          
          } else if (path.match(val.route.inbound) != null) {
            
            // Match segments in decreasing order
            switch(segment_count) {
              case 4:
                var matcher = "/" + segment[1] + "/" + segment[2]
                if (matcher == val.route.inbound) {
                  match = "Match found (bmi.com" + val.route.inbound + " ----> /mobile" + val.route.outbound + ")";
                  redirect = val.route.outbound + "/" + segment[3] + "/" + segment[4];
                }
                break;
              case 3:
                var matcher = "/" + segment[1] + "/" + segment[2];
                if (matcher == val.route.inbound) {
                  match = "Match found (bmi.com" + val.route.inbound + " ----> /mobile" + val.route.outbound + ")";
                  redirect = val.route.outbound + "/" + segment[3];
                }
                break;
              case 2:
                var matcher = "/" + segment[1];
                if (matcher == val.route.inbound) {
                  match = "Match found (bmi.com" + val.route.inbound + " ----> /mobile" + val.route.outbound + ")";
                  redirect = val.route.outbound + "/" + segment[2];
                }
                break;
              default:
            }

            if (query != '' && redirect.match('\\?') == null && query != 'mobile=force') {
              redirect = redirect + "?" + query;
            }
            
            // console.log(match);
            
            // Redirect if match was found
            // If match not found, just load normal desktop page
            if (redirect != '') {
              redirect_to_mobile(redirect);
              break;
            }

          // If no match found
          } else {
            nomatch = "No match found for " + val.route.inbound;
            // console.log(nomatch);
          }
        }
      }
    }        
}
