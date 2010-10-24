/*
 * jquery.lastfm.js
 * Show your Last.fm info with ease
 *
 * - Show 10 recent played tracks
 *
 * Author: Yves Van Broekhoven
 * Date: 2010-10-24
 * Version: 0.1
 *
 */

(function($){
  
  // Initialize privates
  var _getRecentTracks;

  $.fn.lastfm = function(username, apikey, options){
    
    // Map _this to our plugin obj
    _this = $.fn.lastfm;
    
    // Extend options
    var opts = options ? $.extend({}, $.fn.lastfm.defaults, options) : $.fn.lastfm.defaults;
    
    return this.each(function(){
      $this = $(this);
      _this.getRecentTracks(username, apikey, opts);
    });
    
  };
  
  
  /*
   * Default options
   */
  $.fn.lastfm.defaults = {
    limit: 10
  };
  
  
  /*
   * getRecentTracks
   * 10 recently played tracks for this profile
   */
  $.fn.lastfm.getRecentTracks = function(username, apikey, opts){
    _getRecentTracks(username, apikey, opts);
  };
  
  
  /*
   * getRecentTracks
   * @private
   */
  _getRecentTracks = function(username, apikey, opts){
    $.ajax({
      url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=' + apikey + '&user=' + username + '&limit=' + opts.limit + '&format=json&callback=?',
      dataType: 'json',
      success: function(data) {
        _renderResult(data);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        _renderMessage(textStatus);
      }
    });
  };
  
  _renderMessage = function(text){
    $this.html(text);
  }

  _renderResult = function(data){
    $this.append(_renderTracks(data['recenttracks'].track));
  }
  
  _renderTracks = function(tracks){
    var ol = $('<ol></ol>');
    
    $.each(tracks, function(idx, track){
      var artist  = track.artist["#text"];
      var name    = track.name;
      var date    = track.date["#text"];
      var url     = track.url;
      
      var span  = $('<span></span>');
      span.addClass('date')
          .html(date);
      
      var a   = $('<a></a>');
      a.attr('href', url)
       .html(artist + ' - ' + name);
      
      var li  = $('<li></li>');
      li.append(a)
        .append(span);
        
      ol.append(li);
    });
    
    return ol;
  }
  
})(jQuery);