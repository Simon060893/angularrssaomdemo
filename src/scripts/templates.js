angular.module('feeds').directive('shapeDiagramm', ['$timeout', function ($timeout) {
  return {
    link: function (scope, element, attributes) {
      $timeout(function () {
        var text = (angular.element(element).text().toLowerCase() ),
            result = {
              labels:[],
              series:[]
            };



        (function calcCountMatch(str) {
          var character = str[0];
          if(!character)return;
          var countMatch = str.split(character).length - 1;
          result.labels.push(  character.toUpperCase());
          result.series.push(  countMatch);
          calcCountMatch(str.replace(new RegExp(character , "gi"), ""));
        })((text.replace(/[^a-z]/gi, "")))
        var options = {
          labelInterpolationFnc: function(value) {
            return value[0]
          }
        };
        var responsiveOptions = [
          ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
              return value;
            }
          }],
          ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 50
            ,labelDirection: 'explode',
          }]
        ];

        new Chartist.Pie(angular.element(element).parent().find('.ct-chart')[0], result, options);

      });



    }
  }
}]).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('feed-list.html',
    "<div>\n" +
    "    <div ng-show=\"error\" class=\"alert alert-danger\">\n" +
    "        <h5 class=\"text-center\">Oops... Something bad happened, please try later :(</h5>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"media-list\">\n" +
    "        <li ng-repeat=\"feed in feeds | orderBy:publishedDate:reverse\" class=\"media\">\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\"><a target=\"_new\" href=\"{{feed.link}}\" ng-bind-html=\"feed.title\"></a></h4>\n" +
    "                <p ng-bind-html=\"!summary ? feed.content : feed.contentSnippet\"></p>\n" +
    "            </div>\n" +
    "            <hr ng-if=\"!$last\"/>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


 

}]);
