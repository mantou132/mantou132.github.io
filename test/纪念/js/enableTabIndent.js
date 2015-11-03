function enableTabIndent(t,e){
    if(e.keyCode === 9){
        var start = t.selectionStart;
        var end = t.selectionEnd;


        //****************
        function jq(e){
            var jQ = {};
            jQ.val = function(v){return v?e.value=v:e.value;}
            return jQ;
        }
        //jq未定义自己简针对textarea写下


        var that = jq(t);

        var value = that.val();
        var before = value.substring(0, start);
        var after = value.substring(end);
        var selArray = value.substring(start, end).split('\n');

        var isIndent = !e.shiftKey;

        if(isIndent){
            if(start === end || selArray.length === 1){
                that.val(before + '\t' + after);
                t.selectionStart = t.selectionEnd = start + 1;
            } else {
                var sel = '\t' + selArray.join('\n\t');
                that.val(before + sel + after);
                t.selectionStart = start + 1;
                t.selectionEnd = end + selArray.length; 
            }
        } else {
            var reduceEnd = 0;
            var reduceStart = false;

            if(selArray.length > 1) {
                selArray.forEach(function(x, i, a){
                    if(i>0 && x.length>0 &&  x[0]==='\t'){
                        a[i] = x.substring(1);
                        reduceEnd++;
                    }
                });
                sel = selArray.join('\n');
            } else {
                sel = selArray[0];
            }

            var b1 = '',b2 = '';
            if(before.length){
                var npos = before.lastIndexOf('\n');
                if(npos !== -1){
                    b1 = before.substring(0, npos+1);
                    b2 = before.substring(npos+1);
                } else {
                    b1 = '';
                    b2 = before;
                }

                sel = b2 + sel;
            }

            if(sel.length && sel[0]==='\t'){
                sel = sel.substring(1);
                reduceStart = true;
            }

            that.val(b1 + sel + after);
            t.selectionStart = start + (reduceStart ? -1 : 0);
            t.selectionEnd = end - (reduceEnd + (reduceStart ? 1 : 0));
        }
        return true;
    }
    return false;
}

// document.getElementById('tabbed').onkeydown = function(e){
//     if(enableTabIndent(this, e)){
//         e.preventDefault();
//     }
// };
