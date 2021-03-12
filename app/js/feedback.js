function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}
window.isset = function (v) {
    if (typeof(v) == 'object' && v == 'undefined') {
        return false;
    } else  if (arguments.length === 0) {
        return false;
    } else {
        var buff = arguments[0];
        for (var i = 0; i < arguments.length; i++){
            if (typeof(buff) === 'undefined' || buff === null) return false;
            buff = buff[arguments[i+1]];
        }
    }
    return true;
}

function myconf() {
    var cf = $.Deferred();
        $.ajax({
            type: 'POST',
            url: 'feedback/',
            dataType: 'json',
            data: 'act=cfg',
            success: function(answer) {
                cf.resolve(answer.configs);
            }
        });
    return cf;
}

var mcf = myconf();

mcf.done(function(conf) {

    /*Отправка форм.*/
    
    function feedback(vars) {
        var bt = $(vars.form).find('.feedback');
        var btc = bt.clone();
        var bvc = bt.val();
        var cfg = conf[vars.act].cfg;
    
        $.ajax({
            type: 'POST',
            url: 'feedback/',
            cache: false,
            dataType: 'json',
            data: 'act=' + vars.act + '&' + vars.data,
            beforeSend: function() {
                $(bt).prop("disabled", true);
                $(bt).addClass('loading');
            },
            success: function(answer) {
               
                $(bt).prop("disabled", false);
                $(bt).removeClass('loading');
    
                if(isset(answer.ok) && answer.ok == 1) {
                    $(vars.form)[0].reset();
                    $.each(answer.infos, function(k,val) {
                        $.fancybox.open([{ href : '#responseMessage', padding : 0 }] );
                        $('#responseMessage .modal-content').removeClass('error').html(val);
                    });
                }else{
                    $.each(answer.errors, function(k,val) {
                        $.fancybox.open([{ href : '#responseMessage', padding : 0 }] );
                        $('#responseMessage .modal-content').addClass('error').html(val);
                    });
                }
                $('#responseMessage .fancyClose').click(function(){
                    $.fancybox.close('#responseMessage');
                    return false;
                });
            }
        });
    
    }
    
        
    
    
    /**
     * Обработчик кнопки форм.
     * Кнопка должна быть внутри тегов <form> c классом .feedback
     * будет отправлено любое кол-во полей, кроме файлов
     *
     */
    
    $(document).on('click', '.feedback', function(){
       var form = $(this).closest('form'), name = form.attr('name'), obj = {};
           obj.form = form;
           obj.act = name;
           obj.data = $(form).serialize();
    
          feedback(obj);
    
        return false;
    });

}); // done