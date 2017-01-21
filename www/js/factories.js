angular.module('prodag.factories', [])

.factory('FeedLoader', function ($resource){
  return $resource('https://ajax.googleapis.com/ajax/services/feed/load', {}, {
    fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
  });
})
;
