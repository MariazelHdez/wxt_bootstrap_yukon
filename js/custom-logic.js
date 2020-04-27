(function ($, Drupal) {

  Drupal.behaviors.webformSettings = {
    attach: function (context, settings) {
    $('#edit-preview .panel-heading', context).once('webformPreviw').each(function () {   		
        $("#edit-preview .panel-heading").remove();	
    });

    } 
  };
  Drupal.behaviors.fileUploadEnhancements = {
    attach: (context) => {
        var bar2;
      const fileUploads = $('.form-item-attach-complaint-documents-and-or-supporting-material .form-type-checkbox', context);
         $("#file_load_bar", context).once('webformPreviw').each(function () {           
            var bar1 = new ldBar("#file_load_bar");
            $("#file_load_bar").css('display', 'none'); 
        });
      
      if (fileUploads.length >= 10) {
        const uploadInput = $('input[id^="edit-attach-complaint-documents-and-or-supporting-material-upload"]');
        if (uploadInput.length > 0) {
          uploadInput.prop('disabled', true);
        }
      }
      const buttons = [
        '.webform-button--next',
        '.webform-button--previous',
        '.webform-button--restart',
      ];
      $(context).ajaxStart(() => {
        $("#file_load_bar").css('display', 'block');
        var count = 20;
        if(document.getElementById('file_load_bar')){
          /* ldBar stored in the element */
          bar2 = document.getElementById('file_load_bar').ldBar;
          
  
          bar2.set(count);
          for (const index in buttons) {
            if ($(buttons[index]).length > 0) {
              $(buttons[index]).prop('disabled', true);
              count += 10;
              bar2.set(count);
            }
          }
          // repeat with the interval of 2 seconds
          let timerId = setInterval(function(){
              count += 10;
              bar2.set(count);
              }, 5000);
          setTimeout(() => { clearInterval(timerId); count += 10;bar2.set(count); }, 25000);
        }
      });
      $(context).ajaxComplete(() => {
        bar2 = document.getElementById('file_load_bar').ldBar;
        bar2.set(100);
        $("#file_load_bar").css('display', 'none');
        for (const index in buttons) {
          if ($(buttons[index]).length > 0) {
            $(buttons[index]).prop('disabled', false);
          }
        }
      });
    },
    detach: (context) => {

    },
  };
  
  Drupal.behaviors.webformFeedback = {
    attach: function (context, settings) {
    $('#edit-was-this-page-helpful-yes,#edit-was-this-page-helpful-yes', context).once('webformHands').each(function () {   
      $("#edit-was-this-page-helpful-yes").click(function(){
        $("label[for='edit-was-this-page-helpful-yes']").css('color','#00818f');
        $("label[for='edit-was-this-page-helpful-no']").css('color','#b2b3b2');
      });
      $("#edit-was-this-page-helpful-no").click(function(){
        $("label[for='edit-was-this-page-helpful-yes']").css('color','#b2b3b2');
        $("label[for='edit-was-this-page-helpful-no']").css('color','#00818f');
      });
    });

    } 
  };
})(jQuery, Drupal);


