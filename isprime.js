
var primes = [1];
var not_primes = [];

exports.isPrime = function( arg, outlog ) {
    return _isPrime( arg, outlog );
};

exports.dumpPrimes = function() {
    console.log("var primes = ");
    console.log(primes);
};

exports.dumpNonPrimes = function() {
    console.log("var not_primes = ");
    console.log(not_primes);
};

exports.clearMems = function() {
    primes = [1];
    not_primes = [];
    exports.dumpPrimes();
    exports.dumpNonPrimes();
};

var _isPrime = function( arg, outlog ) {
    
    if ( arg === 0 ) {
        return false;
    }

    if ( not_primes.indexOf( arg ) > -1 ) {
        _log( "arg:"+arg+" is on the not_primes list.", outlog );
        return false;
    }

    if ( primes.indexOf( arg ) > -1 ) {
        _log( "arg:"+arg+" is on the primes list.", outlog );
        return true;
    }

    var arg_sqrt = Math.sqrt( arg );
    for ( var cand = 2; cand <= arg_sqrt; cand++ ) {
        if ( primes.indexOf( cand ) > -1 ) {
            _log("[check] Can "+cand+" divide arg:"+arg+"?", outlog );
            if ( arg % cand === 0 ) {
                _log("    ==> yes", outlog );
                _log(cand+" can divide arg:"+arg, outlog );
                not_primes.push(arg);
                return false;
            } else {
                _log("    ==> no", outlog );
            }
        } else if ( _isPrime( cand, false ) ) {
            _log("[check] Can "+cand+" divide arg:"+arg+"?", outlog );
            if ( arg % cand === 0 ) {
                _log("    ==> yes", outlog );
                _log(cand+" can divide arg:"+arg, outlog );
                not_primes.push( arg );
                return false;
            }
        } else {
            _log( "no need to check cand:"+cand, outlog );
            continue;
        }
    } 

    _log( "check from 2 to "+arg_sqrt+" finished. arg:"+arg+" is prime.", outlog );
    primes.push(arg);
    return true;
}

var _log = function( msg, flag ) {
    if ( flag === true ) {
        console.log( msg );
    }
}
