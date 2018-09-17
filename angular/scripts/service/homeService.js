/**
 * Created by Admin on 2/6/2018.
 */
smartApp
    .factory('Pages', function (Restangular, AbstractRepository) {

        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'pages');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();

    });
//  .filter('split', function() {
//     return function(input, delimiter) {
//         delimiter = delimiter || ','
//
//         return input.split(delimiter);
//     }
// });