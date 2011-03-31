// app utilities

_ = {
	bind: function(func, scope){
        return function(){
            return func.apply(scope, Array.prototype.slice.call(arguments));
        }
    }
};