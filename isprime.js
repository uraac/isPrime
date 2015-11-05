
var primes = [];
var non_primes = [];

exports.isPrime = function( arg, outlog ) {
    var result = _isPrime( arg, outlog );
    if ( result ) {
        _log( "[isPrime] arg:"+arg+" is a prime number.", true );
    } else {
        _log( "[isPrime] arg:"+arg+" is NOT a prime number.", true );
    }
    return result;
};

exports.isPrimeE = function( arg, outlog ) {
    var result = _isPrimeE( arg, outlog );
    if ( result ) {
        _log( "[isPrime_E] arg:"+arg+" is a prime number.", true );
    } else {
        _log( "[isPrime_E] arg:"+arg+" is NOT a prime number.", true );
    }
    return result;
};

exports.test = function( arg, outlog ) {
    if ( exports.isPrime( arg, outlog ) === exports.isPrimeE( arg, outlog ) ) {
        _log("TEST OK.", true);
    } else {
        throw new Error("function isPrime doesn't pass the test.");
    }
};

exports.dumpPrimes = function() {
    _log("var primes = ", true);
    _log(primes, true);
};

exports.dumpNonPrimes = function() {
    _log("var non_primes = ", true);
    _log(non_primes, true);
};

exports.clearMems = function() {
    primes = [];
    non_primes = [];
    exports.dumpPrimes();
    exports.dumpNonPrimes();
};

var _isPrime = function( arg, outlog ) {
    
    if ( arg === 0 ) {
        return false;
    }

    if ( arg === 1 ) {
        return false;
    }

    if ( non_primes.indexOf( arg ) > -1 ) {
        _log( "arg:"+arg+" is on the non_primes list.", outlog );
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
                non_primes.push(arg);
                return false;
            } else {
                _log("    ==> no", outlog );
            }
        } else if ( _isPrime( cand, false ) ) {
            _log("[check] Can "+cand+" divide arg:"+arg+"?", outlog );
            if ( arg % cand === 0 ) {
                _log("    ==> yes", outlog );
                _log(cand+" can divide arg:"+arg, outlog );
                non_primes.push( arg );
                return false;
            }
        } else {
            _log( "no need to check cand:"+cand, outlog );
            continue;
        }
    } 

    _log( "check from 2 to "+arg_sqrt+" finished. arg:"+arg+" is prime number.", outlog );
    primes.push(arg);
    return true;
};

var _log = function( msg, flag ) {

    if ( typeof flag === 'undefined' ) {
        flag = false;
    }
    if ( flag === true ) {
        console.log( msg );
    }
};

var _isPrimeE = function( arg, outlog ) {

    if ( arg === 0 ) {
        return false;
    }
    if ( arg === 1 ) {
        return false;
    }

    var sieve = [];
    for ( var num = 2; num < arg; num++ ) {
        for ( var elem = 1; elem * num <= arg; elem++ ) {
            var not_prime_num = num * elem;
            if ( sieve.some( function( elem, index, arr ) {
                if ( elem.val === not_prime_num ) {
                    return true;
                }
            }) === false ) {
                _log("[TEST] sieve added: "+not_prime_num, outlog );
                sieve.push( {val:not_prime_num, base:num} );
            }
        }

        var result = {};
        var found = sieve.some( function( elem, index, arr ) {
            if ( elem.val === arg ) {
                result.base = elem.base;
                return true;
            }
        });

        if ( found ) {
            _log( result.base+" can divide arg:"+arg, true );
            return false;
        }
    }
    _log("arg:"+arg+" passes the sieve.", outlog );
    return true;
};
