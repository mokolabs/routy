

// MOBILE DETECTION
function redirect_to_mobile(redirect) {
  window.location.href = "/mobile" + redirect;
}

// Check for supported mobile browsers
if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i) || 
    navigator.userAgent.match(/iPod/i) ||
    location.href.match(/mobile=force/i) == 'mobile=force') {
      
    // External links (with target=_blank)
    if (location.href.match(/mobile=skip/i)) {

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
            
            if (query != '' && redirect.match('?') == null && query != 'mobile=force') {
              redirect = redirect + "?" + query;
            }
            
            // console.log(match);
            
            redirect_to_mobile(redirect);

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

            if (query != '' && redirect.match('?') == null && query != 'mobile=force') {
              redirect = redirect + "?" + query;
            }
            
            // console.log(match);
            
            redirect_to_mobile(redirect);

          // If no match found
          } else {
            nomatch = "No match found for " + val.route.inbound;
            // console.log(nomatch);
          }
        }
      }
    }        
}
