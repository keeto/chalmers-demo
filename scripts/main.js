require(['$api/models'], function(models) {

  var list = document.getElementById('tracks');
  var playlist = models.Playlist.fromURI('spotify:user:imk2:playlist:5bCaLOzYegByxXP7IXHsIA');
  playlist.load('name', 'tracks').done(function(playlist){
    document.getElementById('playlist-title').innerText = playlist.name;
    playlist.tracks.snapshot(0, 10).done(function(snapshot) {
      var promises = [];
      for (var i = 0, l = snapshot.range.length; i < l; i++) {
        var track = snapshot.get(i);
        promises.push(track.load('name', 'image'));
      }
      models.Promise.join(promises).done(function(tracks) {
        for (var i = 0, l = tracks.length; i < l; i++) {
          var track = tracks[i];
          var listItem = document.createElement('li');
          var img = document.createElement('img');
          img.src = track.image;
          listItem.appendChild(img);
          var name = document.createElement('h2');
          name.innerText = track.name;
          listItem.appendChild(name);
          list.appendChild(listItem);
        }
      });
    });

  });

});
