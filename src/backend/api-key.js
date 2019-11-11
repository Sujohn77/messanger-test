module.exports = function (numberKey = 16) {

    function xGet(numberKey){
        if(numberKey === 0 || numberKey === undefined)
            return "x";
        return "x"+xGet(numberKey-1);
    }

    const api_key = xGet(numberKey);

    // const uuid = strTemplate.replace(/[xy]/g, function(c) {
    //     const r = (d + Math.random()*16)%16 | 0;
    //     d = Math.floor(d/16);
    //     return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    // });

    return api_key;
};