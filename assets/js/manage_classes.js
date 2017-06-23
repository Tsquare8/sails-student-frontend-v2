(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of class id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getClass(record_id){
    return $.get("http://localhost:1337/class/" + record_id, function(data){
      console.log("got class");
    })
  }

  $(function(){

    //add copy, csv, etc. buttons, the ability to scroll and reorder columns
    $("#classesTable").DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        colReorder: true,
        "scrollX": true
    });

//validate edits for specific fields and provide error messages
  var validator = $("#manageClassesForm").validate({
      // debug: true,
      errorClass: "text-danger",
      rules: {
        instructor_id: {
          required: true
        },
        subject: {
          required: true
        }
      },
      messages: {
        instructor_id: {
          required: "Instructor ID is required"
        },
        subject: {
          required: "Subject is required"
        }
      }
    });


    //initialize variables for items in the DOM we will work with
    let manageClassesForm = $("#manageClassesForm");
    let addClassesButton = $("#addClassesButton");

    //add class button functionality
    addClassesButton.click(function(){
      //clear form so that fields do not have data in them
      $("input").val("");
      //clear error messages
      validator.resetForm();
      manageClassesForm.attr("action", "/create_classes");
      manageClassesForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageClassesForm.submit()
          }
        }
      });
    })

  	$("#classesTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("classid")
      validator.resetForm();
      manageClassesForm.find("input[name=class_id]").val(recordId);
      manageClassesForm.attr("action", "/update_classes");
      let currentClass = getClass(recordId);

      //populate form when api call is done (after we get class to edit)
      currentClass.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]'),
                type = $el.attr('type');

            switch(type){
                case 'checkbox':
                    $el.attr('checked', 'checked');
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val);
            }
        });
      })

      manageClassesForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageClassesForm.submit()
          }
        }
      });
    })


    $("#classesTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("classid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Class": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
