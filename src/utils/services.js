import request from './request.js';

export function zmCustormCard(params) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve(params);
        }, 2200);
    })
}
