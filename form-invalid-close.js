angular.module('form-invalid-close').directive('closeAlert', function ($parse, $compile) {
    return {
        require: '^form',
        link: function (scope, elm, attr, formCtrl) {

            var fn = $parse(attr.closeAlert, /* interceptorFn */ null, /* expensiveChecks */ true)

            elm.on('click', function (event) {
                var callback = function () {
                    fn(scope, {
                        $event: event
                    });
                };
                if (!formCtrl.$pristine) { // if form is touched
                    bootbox.confirm(attr.closeMessage, function (result) {

                        scope.$evalAsync(callback);
                    });
                } else { //if not touched
                    scope.$evalAsync(callback);
                }



            });
        }
    };